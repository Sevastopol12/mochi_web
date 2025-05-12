import AccountManager from './models/Manager/account_manager.js';
import ProductManager from './models/Manager/product_manager.js';
import OrderManager from './models/Manager/order_manager.js';
import Product from './models/Product/product.js';
import User from './models/Account/user.js';
import Admin from './models/Account/admin.js';
import AppConfig from './models/Config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const pm = new ProductManager();
const om = new OrderManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define routes
// Homepage
app.route('/')
.get(async (req, res) => {
  console.log(await pm.listAll())
  res.render('homepage', {title: 'Home page'})
})


// Product page
app.get('/product', (req, res) => {
  res.render('product', { title: 'product' });
});


// AJAX service: GET product API
app.get('/api/products', async (req, res) => {
  try {
    let response = await pm.listAll();
    res.json(response);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/order', async (req, res) => {
  try {
    let { products } = req.body;
    let my_order = om.create(products=products)
  }

  catch(err) {

  }
});


// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});