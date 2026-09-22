import React from 'react';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
