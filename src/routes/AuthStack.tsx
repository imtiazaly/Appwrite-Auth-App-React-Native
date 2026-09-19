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
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
