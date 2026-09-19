/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { AppwriteProvider } from './src/appwrite/AppwriteContext';
import { name as appName } from './app.json';

const Root = () => {
  return (
    <AppwriteProvider>
      <App />
    </AppwriteProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);