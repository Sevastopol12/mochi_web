import AppConfig from '../Config.js'
import User from '../Account/user.js'
import Admin from '../Account/admin.js'
import { ObjectId } from 'mongodb';
import BaseManager from './base_manager.js';

class AccountManager extends BaseManager {
  constructor() {
    super();
    this.collection = 'accounts';
  }

  async add({ name, password, email, phone_number }) {
    let db = await this.promise;
    let accountsCollection = db.collection(this.collection);
    let new_account = new User(name, password, email, phone_number);

    try {
      let result = await accountsCollection.insertOne(new_account);
      new_account.id = result.insertedId.toString();
      return this;
    } catch (error) {
      console.error('Error adding account to database:', error);
      throw error;
    }
  }

  async getByUsername(username) {
    let db = await this.promise;
    let accountsCollection = db.collection(this.collection);

    try {
      let account = await accountsCollection.findOne({ username: username });
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
    } catch (error) {
      console.error(`Error getting account by username "${username}" from database:`, error);
      throw error;
    }
  }

  async remove(id) {
    let db = await this.promise;
    let accountsCollection = db.collection(this.collection);

    try {
      let result = await accountsCollection.deleteOne({ _id: ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error removing account with ID "${id}" from database:`, error);
      throw error;
    }
  }

  async listAll() {
    let db = await this.promise;
    let accountsCollection = db.collection(this.collection);
    return accountsCollection.find({}).toArray();
  }
}

export default AccountManager;
