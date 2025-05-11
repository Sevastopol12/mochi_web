import AppConfig from '../Config.js'
import BaseManager from './base_manager.js';

/**
 * This class handles revenue-related info. Works directly with order collection. 
 */
class ReveCounter extends BaseManager {
  constructor() {
    super();
    this.order_collection = 'order';
    this.sales_collection = 'sales';
  }

  // Not applicable for revenue — implement as empty or throw
  async add() {
    throw new Error("ReveCounter does not support add()");
  }

  async remove() {
    throw new Error("ReveCounter does not support remove()");
  }

  async listAll() {
    let db = await this.promise;
    let orders = db.collection(this.order_collection);
    return orders.find({}).toArray();
  }

  async revenue() {
    let db = await this.promise;
    let orders = await db.collection(this.order_collection).find({}).toArray();

    let total_revenue = 0;
    orders.forEach(order => {
      total_revenue += order.total || 0;
    });

    return total_revenue;
  }

  async product_sales() {
    let db = await this.promise;
    return db.collection(this.sales_collection);
  }
}

export default ReveCounter;