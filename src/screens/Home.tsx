import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Snackbar } from 'react-native-snackbar';
import AppwriteContext from '../appwrite/AppwriteContext';

type UserDetails = {
  id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  createdAt: string;
};

const Home = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const fetchUserDetails = useCallback(() => {
    appwrite
      .getAccountDetails()
      .then(response => {
        if (response) {
          setUser({
            id: response.$id,
            name: response.name || 'User',
            email: response.email,
            emailVerification: response.emailVerification,
            createdAt: new Date(response.$createdAt).toLocaleDateString(),
          });
        }
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
        Snackbar.show({
          text: 'Failed to fetch user details.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#FF4D4D',
        });
      });
  }, [appwrite]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await appwrite.logoutAccount();
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logged out successfully.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#10B981',
      });
    } catch (error) {
      console.error('Logout error:', error);
      Snackbar.show({
        text: 'Logout failed. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#FF4D4D',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <View style={styles.brandDot} />
            <Text style={styles.brandTitle}>Appwrite Dashboard</Text>
          </View>
          <Pressable
            onPress={handleLogout}
            disabled={isLoggingOut}
            style={styles.headerLogoutBtn}
          >
            {isLoggingOut ? (
              <ActivityIndicator color="#F02E65" size="small" />
            ) : (
              <Ionicons name="log-out-outline" size={22} color="#F02E65" />
            )}
          </Pressable>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user ? getInitials(user.name) : 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Loading...'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'fetching details...'}
          </Text>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active Session</Text>
          </View>
        </View>

        {/* Info Grid */}
        <Text style={styles.sectionTitle}>Account Overview</Text>

        <View style={styles.infoGrid}>
          {/* Item 1 */}
          <View style={styles.infoCard}>
            <Ionicons name="key-outline" size={24} color="#F02E65" />
            <Text style={styles.infoLabel}>User ID</Text>
            <Text
              style={styles.infoValue}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {user?.id || '---'}
            </Text>
          </View>

          {/* Item 2 */}
          <View style={styles.infoCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#10B981"
            />
            <Text style={styles.infoLabel}>Email Verified</Text>
            <Text style={styles.infoValue}>
              {user?.emailVerification ? 'Verified' : 'Unverified'}
            </Text>
          </View>

          {/* Item 3 */}
          <View style={styles.infoCard}>
            <Ionicons name="calendar-outline" size={24} color="#6366F1" />
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>{user?.createdAt || '---'}</Text>
          </View>

          {/* Item 4 */}
          <View style={styles.infoCard}>
            <Ionicons name="cloud-done-outline" size={24} color="#F59E0B" />
            <Text style={styles.infoLabel}>Backend Service</Text>
            <Text style={styles.infoValue}>Appwrite Cloud</Text>
          </View>
        </View>

        {/* Logout Action Button */}
        <Pressable
          onPress={handleLogout}
          disabled={isLoggingOut}
          style={({ pressed }) => [
            styles.logoutBtn,
            pressed && styles.btnPressed,
            isLoggingOut && styles.btnDisabled,
          ]}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
              <Text style={styles.logoutBtnText}>Sign Out Account</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F02E65',
    marginRight: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerLogoutBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(240, 46, 101, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(240, 46, 101, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#161B2E',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#232B45',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F02E65',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#F02E65',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#161B2E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#232B45',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 10,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default Home;
