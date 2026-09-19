import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppwriteContext from '../appwrite/AppwriteContext';
import Loading from '../components/Loading';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';

export const Routes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getAccountDetails()
      .then(response => {
        setIsLoggedIn(!!response);
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};