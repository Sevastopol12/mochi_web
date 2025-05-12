import OrderManager from "../models/Manager/order_manager";

const om = new OrderManager()

export async function commitOrder(req, res, next) {
    try {
        let product_list = req.body;
        

        let my_order = om.create(product_list);

    } 
    catch (err) {
        next(err);
    }
}