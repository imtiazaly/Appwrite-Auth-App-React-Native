import { Account, ID, Client } from 'appwrite';
import Config from 'react-native-config';

import { Snackbar } from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type createUserAccount = {
  email: string;
  password: string;
  name: string;
};

type loginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  async createUserAccount({ email, password, name }: createUserAccount) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return this.loginAccount({ email, password });
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: createUserAccount :: ', error);
    }
  }

  async loginAccount({ email, password }: loginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('Appwrite Service :: loginAccount :: ', error);
    }
  }

  async getAccountDetails() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite Service :: getAccountDetails :: ', error);
    }
  }

  async logoutAccount() {
    try {
      return await this.account.deleteSession({
        sessionId: 'current',
      });
    } catch (error) {
      console.log('Appwrite Service :: logoutAccount :: ', error);
    }
  }
}

export default new AppwriteService();
