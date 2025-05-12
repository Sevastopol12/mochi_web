import Order from "../Order/order.js";
import BaseManager from "./base_manager.js";

export default class OrderManager extends BaseManager{
    constructor(){
        super();
        this.collection = 'orders'
        this.order;
    }

    // Create a temporary order object. This object lives on the client side
    create(products) {
        this.order = new Order(id=this.generateID(), date=this.getDate(), products=this.products)
        order.calculateTotal();
    }

    // Store order into database    
    async add() {
        if (this.order === null  || this.order.products.length < 1) {throw new Error('You havent add any item yet');}
        let db = await this.dbPromise;
        let orders = db.collection(this.collection);
        
        // Insert 
        await orders.insertOne(this.orders);
        this.order = null; // Reset order variable
        return;
    }

    // Cancel order
    cancel() {
        this.order = null;
        return;
    }

    // Assign payment method
    addPayment(method) {
        this.order.assignPaymentMethod(method);
        return;
    }

    // Assign delivery address
    addLoc(address) {
        this.order.assignAddress(address);
        return;
    }
    
    // Generate random id
    generateID() {
        return Array.from({'length': 5}, () => Math.floor(Math.random()*10)).join('');
    }

    // Get today's date
    getDate() {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
}