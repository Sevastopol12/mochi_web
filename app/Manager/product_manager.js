import Product from "../Product/product.js";
import AppConfig from "../Config.js";
import { ObjectId } from "mongodb";


/**
 * A class that works with the product database, have all access and permission to manipulate the product database
 */
class ProductManager {
  constructor() {
    this.config = new AppConfig();
    this.dbPromise = this.config.initDB()
    this.collection = 'products';
  }

  // Add a product
  async add({product_id, name, price, quantity}) {
    let db = await this.dbPromise;
    let products = db.collection('products');

    // Create a new product and add it into the database
    try {
      let new_product = new Product({id: product_id, name: name, price: price, quantity: quantity});
      await products.insertOne(new_product);
      return this;
    }

    catch (error) {
      console.error('Error adding account to database:', error);
      throw error;
    }
  }

  // Remove a product 
  async remove({product_id}) {
    let db = await this.dbPromise;
    let products = db.collection('products');
    
    // Validate product existence
    let product = products.findOne({id: product_id});

    // Return the product if it existed
    if (product !== null) {
      await products.deleteOne({id: product_id})
    }
    else {return this;} // return self else
  }

  // Update product quantity 
  async updateQuantity(product, add_quantity) {
    let db = await this.dbPromise;
    let products = db.collection('products');
    let new_quantity = product.quantity + add_quantity

    await products.updateOne(
      {id: product.id},
      {$set: {quantity, new_quantity}}
    );

      return this;
  }

  // Return all product in the database
  async listAll() {
    let db = await this.dbPromise;
    let products = db.collection('products');

    // Get all existing product
    let all_products = products.find({});

    if (all_products !== null){
      all_products = all_products.toArray();
      return all_products;
    }

    else {return null;}

  }

  // Find a product using its id
  async findById(product_id) {
    let db = await this.dbPromise;
    let products = db.collection('products');

    // Validate product existence
    let product_exist = products.findOne({id: product_id});

    if (product_exist !== nul) {return product_exist;} // return the product if it existed
    else {return null;} // return null else

  }
}

export default ProductManager;