import ProductManager from "../models/Manager/product_manager.js";
import ReveCounter from "../models/Manager/revenue_counter.js";


const pm = new ProductManager()
const rc = new ReveCounter();
// Add new product
export async function addProduct(req, res, next) {
    try {
        let { productMeta } =  req.body;
        let { product_id, name, price, quantity } = productMeta;

        if (await pm.ExistanceValidation(product_id, name)) {throw new Error("Product already existed! Please choose a different name or try Add-quantity.")};
        // Add to db
        const mess = await pm.add(product_id, name, price, quantity);
        return res.status(200).json({ mess });
    }
    catch(err) {
        return res.status(500).json({message: err.message});
    }
} 

export async function remove(req, res, next) {
    try {
        let { productMeta } =  req.body;
        let { product_id, name, price, quantity } = productMeta;
        await pm.remove(product_id);
    }
    catch (err) {

    }
}

export async function displayRevenue(req, res, next) {
    let mess = {'name': '1', 'total_revenue': 100};
    return res.json(mess);
}