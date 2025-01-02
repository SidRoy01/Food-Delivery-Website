import ConfigVar from "../ConfigVar/ConfigVar";
import { Client, Account, ID } from "appwrite";

export class Service {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(ConfigVar.appwriteUrl)
      .setProject(ConfigVar.appwriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call login methode
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error creating account", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Login error", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error geting user", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
  async updateName(newName) {
    try {
      return await this.account.updateName(newName);
    } catch (error) {
      console.log("Error updating name:", error);
      throw error;
    }
  }

  async updateEmail(newEmail, password) {
    try {
      return await this.account.updateEmail(newEmail, password);
    } catch (error) {
      console.log("Error updating email:", error);
      throw error;
    }
  }
}

const services = new Service();

export default services;
