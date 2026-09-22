import { Account, ID, Client, Models } from 'appwrite';
import Config from 'react-native-config';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string =
  Config.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID || '';

export type CreateUserAccountParams = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserAccountParams = {
  email: string;
  password: string;
};

class AppwriteService {
  account: Account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  async createUserAccount({ email, password, name }: CreateUserAccountParams) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return await this.loginAccount({ email, password });
      }
    } catch (error) {
      console.log('Appwrite Service :: createUserAccount :: ', error);
      throw error;
    }
  }

  async loginAccount({ email, password }: LoginUserAccountParams) {
    try {
      try {
        await this.account.deleteSession({ sessionId: 'current' });
      } catch {
        // Ignored if no session exists
      }

      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      console.log('Appwrite Service :: loginAccount :: ', error);
      throw error;
    }
  }

  async getAccountDetails(): Promise<Models.User<Models.Preferences> | undefined> {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite Service :: getAccountDetails :: ', error);
      return undefined;
    }
  }

  async logoutAccount() {
    try {
      return await this.account.deleteSession({ sessionId: 'current' });
    } catch (error) {
      console.log('Appwrite Service :: logoutAccount :: ', error);
      throw error;
    }
  }
}

export default AppwriteService;
