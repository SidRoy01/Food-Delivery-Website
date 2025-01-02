import { Client, Databases, ID, Query } from "appwrite";
import ConfigVar from "../ConfigVar/ConfigVar";

export class AddressService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(ConfigVar.appwriteUrl)
      .setProject(ConfigVar.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // Save a new address
  async saveAddress(userId, name, address) {
    try {
      const response = await this.databases.createDocument(
        ConfigVar.appwriteDatabaseId,
        ConfigVar.appwriteCollectionId,
        ID.unique(),
        {
          userId,
          name,
          address,
          createdAt: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error saving address:", error);
      throw error;
    }
  }

  // Get all addresses for a user
  async getUserAddresses(userId) {
    try {
      const response = await this.databases.listDocuments(
        ConfigVar.appwriteDatabaseId,
        ConfigVar.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  }
  async updateAddress(addressId, updatedAddress) {
    try {
      const response = await this.databases.updateDocument(
        ConfigVar.appwriteDatabaseId,
        ConfigVar.appwriteCollectionId,
        addressId,
        {
          name: updatedAddress.name,
          address: updatedAddress.address,
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  }
  async deleteAddress(addressId) {
    try {
      const response = await this.databases.deleteDocument(
        ConfigVar.appwriteDatabaseId,
        ConfigVar.appwriteCollectionId,
        addressId
      );
      return response;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  }
}

const addressService = new AddressService();
export default addressService;
