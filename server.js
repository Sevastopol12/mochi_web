import AccountManager from './app/Manager/account_manager.js';
import ProductManager from './app/Manager/product_manager.js';
import Product from './app/Product/product.js';
import User from './app/Account/user.js';
import Admin from './app/Account/admin.js';
import AppConfig from './app/Config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const pm = new ProductManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.route('/')
.get((req, res) => {
  req.render('hompage', {title: 'Home page'})
})

app.get('/product', (req, res) => {
  res.render('product', { title: 'product' });
});


// AJAX
app.get('/api/product', async (req, res) => {
  try {
    const list = await pm.listAll();
    res.json(list);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});