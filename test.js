import OrderManager from "./models/Manager/order_manager.js";
import ProductManager from "./models/Manager/product_manager.js";

const om = new OrderManager()
const pm = new ProductManager();

let a = await pm.listAll();
Object.values(a).forEach(product => {
    console.log(product.name)
});