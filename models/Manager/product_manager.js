
import BaseManager from './base_manager.js';
import Product from '../Product/product.js';

export default class ProductManager extends BaseManager {
  constructor() {
    super();
    this.collection = 'products';
  }

  // Add a product
  async add(product_id, name, price, quantity, description) {
    const db = await this.dbPromise;
    const products = db.collection(this.collection);

    let newId = String(product_id).trim() || String((await this.listAll()).length +1);
  
    const new_product = new Product({ id: newId, name, price, quantity, description });
    await products.insertOne(new_product);
    return 'Successfully added.';
  }

  // Remove a product
  async remove(product_id) {
    const db = await this.dbPromise;
    const products = db.collection(this.collection);
    await products.deleteOne({ id: product_id });
  }

  // Update product quantity
  async updateQuantity(product, add_quantity) {
    const db = await this.dbPromise;
    const products = db.collection(this.collection);
    const newQuantity = product.quantity + add_quantity;
    await products.updateOne({ id: product.id }, { $set: { quantity: newQuantity } });
  }

  // List all existing products
  async listAll() {
    const db = await this.dbPromise;
    const products = db.collection(this.collection);
    return products.find({}).toArray() || [];
  }
  
  // Find a product using its id
  async findById(product_id) {
    const db = await this.dbPromise;
    return await db.collection(this.collection).findOne({ id: product_id });
  }

  // Find a product using its name
  async findByName(product_name) {
    const db = await this.dbPromise;
    return await db.collection(this.collection).findOne({ name: product_name });
  }

  // Existence of a product
  async ExistenceValidation(product_id, product_name) {
    return (await this.findById(product_id) || await this.findByName(product_name)) ? true : false;
  }
}
