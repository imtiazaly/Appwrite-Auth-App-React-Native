import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F02E65" />
      <Text style={styles.text}>Loading Appwrite Auth...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0D17',
  },
  text: {
    marginTop: 16,
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Loading;
