import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppwriteContext from '../appwrite/AppwriteContext';
import Loading from '../components/Loading';

// Routes
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';

export const Routes: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getAccountDetails()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, isLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
