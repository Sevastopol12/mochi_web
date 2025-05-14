import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { renderProductPage, listAll } from './controllers/ProductController.js';
import { handleCommitOrder } from './controllers/OrderController.js';
import { addProduct, displayRevenue } from './controllers/AdminController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const app = express();

// Serve only public/* as static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', async (req, res) => res.render('homepage', { title: 'Home page' }));
app.get('/product', renderProductPage);
app.get('/admin', async (req, res) => res.render('admin', {title: 'Admin page'}));

app.get('/api/products', listAll);
app.get('/api/revenue', displayRevenue);
app.post('/api/order', handleCommitOrder);
app.post('/api/add', addProduct);

// Start server
app.listen(3000, () =>
  console.log('Server running on http://localhost:3000')
);