import React, { useContext, useEffect, useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Snackbar } from 'react-native-snackbar';

import { FAB } from '@rneui/themed';

import AppwriteContext from '../appwrite/AppwriteContext';

type User = {
  name: string;
  email: string;
};

const Home = () => {
  const [user, setUser] = useState<User>();

  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const handleLogout = () => {
    appwrite.logoutAccount().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logged out successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  useEffect(() => {
    appwrite
      .getAccountDetails()
      .then(response => {
        if (response) {
          setUser({
            name: response.name,
            email: response.email,
          } as User);
        }
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
        Snackbar.show({
          text: 'Error fetching account details',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {user && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {user.name}</Text>
            <Text style={styles.userDetails}>Email: {user.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={<Ionicons name="log-out-outline" size={24} color="white" />}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default Home;
