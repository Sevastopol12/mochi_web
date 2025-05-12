import AppConfig from '../Config.js'

/**
 * This class handles revenue-related info. Works directly with order collection. 
 */

class ReveCounter {
    constructor() {
        this.config = new AppConfig();
        this.db_promise = this.config.initDB();
        this.order_collection = 'order';
        this.sales_collection = 'sales';
    }

    //Summarize revenue
    async revenue() {
        let db = await this.db_promise;
        let orders = db.collection(this.order_collection);

        // Report status
        let total_revenue = 0;
        orders.array.forEach(order => {total_revenue += order.total;});

        return total_revenue;
    }

    async product_sales() {
        let db = await this.db_promise; 
        let sales_collection = db.collection(this.sales_collection);
        return sales_collection;
    }

    
}