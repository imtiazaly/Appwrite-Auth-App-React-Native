import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Snackbar } from 'react-native-snackbar';
import AppwriteContext from '../appwrite/AppwriteContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: SignUpScreenProps) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password || !repeatPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await appwrite.createUserAccount({
        name,
        email,
        password,
      });

      if (response) {
        setIsLoggedIn(true);
        Snackbar.show({
          text: 'Account created successfully! Welcome aboard.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#10B981',
          textColor: '#FFFFFF',
        });
      }
    } catch (err: any) {
      console.error('Error creating user:', err);
      setErrorMsg(
        err?.message || 'An error occurred while creating your account.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Branding */}
          <View style={styles.headerContainer}>
            <View style={styles.logoBadge}>
              <Ionicons name="person-add" size={36} color="#F02E65" />
            </View>
            <Text style={styles.appName}>Create Account</Text>
            <Text style={styles.subtitle}>
              Sign up to get started with Appwrite & React Native
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Name Field */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                value={name}
                onChangeText={text => {
                  setErrorMsg('');
                  setName(text);
                }}
                placeholder="John Doe"
                placeholderTextColor="#64748B"
                style={styles.input}
              />
            </View>

            {/* Email Field */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                value={email}
                onChangeText={text => {
                  setErrorMsg('');
                  setEmail(text);
                }}
                placeholder="example@domain.com"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {/* Password Field */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                value={password}
                onChangeText={text => {
                  setErrorMsg('');
                  setPassword(text);
                }}
                placeholder="Min 8 characters"
                placeholderTextColor="#64748B"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.input}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#94A3B8"
                />
              </Pressable>
            </View>

            {/* Repeat Password Field */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                value={repeatPassword}
                onChangeText={text => {
                  setErrorMsg('');
                  setRepeatPassword(text);
                }}
                placeholder="Re-enter your password"
                placeholderTextColor="#64748B"
                secureTextEntry={!showRepeatPassword}
                autoCapitalize="none"
                style={styles.input}
              />
              <Pressable
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#94A3B8"
                />
              </Pressable>
            </View>

            {/* Error Banner */}
            {errorMsg ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#FF4D4D" />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Signup Button */}
            <Pressable
              onPress={handleSignUp}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.btn,
                pressed && styles.btnPressed,
                isLoading && styles.btnDisabled,
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.btnText}>Create Account</Text>
              )}
            </Pressable>
          </View>

          {/* Navigation Link */}
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={styles.loginContainer}
          >
            <Text style={styles.haveAccountLabel}>
              Already have an account?{' '}
              <Text style={styles.loginLabel}>Sign In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(240, 46, 101, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(240, 46, 101, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  appName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#161B2E',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#232B45',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 6,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E253B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E3754',
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  eyeBtn: {
    padding: 6,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.2)',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  btn: {
    backgroundColor: '#F02E65',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#F02E65',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  haveAccountLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  loginLabel: {
    color: '#F02E65',
    fontWeight: '700',
  },
});

export default SignUp;
