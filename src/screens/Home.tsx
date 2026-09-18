import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppwriteContext from '../appwrite/AppwriteContext';
import { Snackbar } from 'react-native-snackbar';

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
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
