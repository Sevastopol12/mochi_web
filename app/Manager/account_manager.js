import AppConfig from '../Config.js'
import User from '../Account/user.js'
import Admin from '../Account/admin.js'
import { ObjectId } from 'mongodb';

/**
 * A class that works with the Account database, have all access and permission to manipulate the Account database
 */
class AccountManager {
  constructor() {
    this.config = new AppConfig();
    this.dbPromise = this.config.initDB();
  }

  // Add an account
  async addAccount({name, password, email, phone_number }) {
    let db = await this.dbPromise;
    let accountsCollection = db.collection('accounts');
    let new_account = new User(name, password, email, phone_number);

    try {
      let result = await accountsCollection.insertOne(new_account);
      new_account.id = result.insertedId.toString();
      return this;
    } 
    
    catch (error) {
      console.error('Error adding account to database:', error);
      throw error;
    }
  }

  // Find and returns account by username
  async getByUsername(username) {
    let db = await this.dbPromise;
    let accountsCollection = db.collection('accounts');

    try {
      let account = await accountsCollection.findOne({username: username});
      if (account) {
        return account.role === 'admin'
          ? new Admin(
              account.name,
              account.password,
              account.email,
              account.phone_number,
              account.username,
              account._id.toString()
            )
          : new User(
              account.name,
              account.password,
              account.email,
              account.phone_number,
              account.username,
              account._id.toString()
            );
      }
    } 
  
  catch (error) {
    console.error(`Error getting account by username "${username}" from database:`, error);
    throw error;
  }
  }

  // Delete an account by its id
  async removeAccount(id) {
    let db = await this.dbPromise; 
    let accountsCollection = db.collection('accounts');

    try {
      let result = await accountsCollection.deleteOne({ _id: ObjectId(id)});
      return result.deletedCount > 0;
    } 
    catch (error) {
      console.error(`Error removing account with ID "${id}" from database:`, error);
      throw error;
    }
  }
}

export default AccountManager;