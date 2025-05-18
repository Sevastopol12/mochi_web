const container = document.getElementById('product-list');
const messageEl = document.getElementById('message');

/* ===========================
   Products
   =========================== */

// Utility to render an arbitrary array of products
function renderGrid(products) {
  container.innerHTML = '';
  products.forEach(p => container.appendChild(renderCard(p)));
}

// Render products
function renderCard(product) {
  // Get the product-card template, defined in the product page
  const template = document.getElementById('product-template').content;
  const clone = document.importNode(template, true);

  // product card
  const card = clone.querySelector('.product-card');
  
  card.id = `product-${product.id}`;
  card.dataset.id = product.id;

  const cardImg = clone.querySelector('.product-image');
  cardImg.src   = product.imageUrl || '/img/mochi.jpeg';
  cardImg.alt   = product.name;
  // Use data-attributes to trigger Bootstrap modal UI
  cardImg.setAttribute('data-bs-toggle', 'modal');
  cardImg.setAttribute('data-bs-target', '#productModal');
  // Populate modal before show
  cardImg.addEventListener('click', () => populateProductModal(product));
  
  clone.querySelector('.product-name').textContent = product.name;
  clone.querySelector('.product-price').textContent = `${product.price.toFixed(2)} VND`;
  clone.querySelector('.qty-value').textContent = 0;
  clone.querySelectorAll('.qty-btn').forEach(btn => {
    const delta = parseInt(btn.dataset.delta, 10);
    btn.addEventListener('click', () => {
      updateCart(product, delta);
    });
  });

  return clone;
}

// Load products
async function loadProducts() {
  try {
    const products = await (await fetch('/api/products')).json();
    allProducts = products;

    // No products
    if (!products || products.length < 1) { container.innerHTML = "<p> No product to display. </p>"; }
    container.innerHTML = '';
    Object.values(products).forEach(product => {container.appendChild(renderCard(product));})
  }
  catch(err) { console.error('Error loading products or template:', err); container.innerHTML = err;}
}

// Display product info
export function populateProductModal(product) {
  // Get modal elements
  const titleEl = document.getElementById('productModalLabel');
  const imgEl   = document.getElementById('modalProductImage');
  const descEl  = document.getElementById('modalProductDesc');
  const priceEl = document.getElementById('modalProductPrice');

  // Fill content
  titleEl.textContent = product.name;
  imgEl.src           = product.imageUrl || '/img/mochi.jpeg';
  imgEl.alt           = product.name;
  descEl.textContent  = product.description || 'No description available.';
  priceEl.textContent = `$ ${product.price.toFixed(2)}`;

  // Re-bind Add to Cart button
  const btnOld = document.getElementById('add-cart');
  const btnNew = btnOld.cloneNode(true);
  btnOld.replaceWith(btnNew);
  btnNew.addEventListener('click', () => {updateCart(product, 1);});
}


/* ===========================
   Shopping Cart
   =========================== */

let cart = {}; 

// Payment method
const payment = document.querySelector('.btn-group .btn.active');
const cashBtn = document.getElementById('pay-cash-btn');
const cardBtn = document.getElementById('pay-card-btn');
[cashBtn, cardBtn].forEach(btn => {
  btn.addEventListener('click', () => {
    cashBtn.classList.remove('active');
    cardBtn.classList.remove('active');
    btn.classList.add('active');
  });
});

// Address
const address = document.getElementById('shipping-address')

// Update cart
function updateCart(product, delta) {
  // Update state
  const entry = cart[product.id] || { product, qty: 0 };
  entry.qty = Math.max(0, entry.qty + delta);
  if (entry.qty === 0) delete cart[product.id];
  else cart[product.id] = entry;

  // Update card badge
  const card = document.querySelector(`.product-card[data-id="${product.id}"]`);
  if (card) card.querySelector('.qty-value').textContent = entry.qty || 0;

  // Re-render cart sidebar
  renderCart();
}

// Render cart item
function renderCart() {
  // Reset error message
  document.getElementById('message').textContent = '';
  let cartEmptyParagraph = document.getElementById('cart-empty');

  // Start rendering
  const ul = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  ul.innerHTML = '';
  let sum = 0;
  if (Object.keys(cart).length >= 0) { cartEmptyParagraph.setAttribute('hidden', 'true'); }

  else {
      ul.innerHTML = '';
      cartEmptyParagraph.setAttribute('hidden', 'false'); 
      return;
  }

  Object.values(cart).forEach(({ product, qty }) => {
    const li = document.createElement('li');
    li.className = 'd-flex justify-content-between align-items-center mb-2';

    li.innerHTML = `
      <span>${product.name} × ${qty}</span>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-1" data-id="${product.id}" data-delta="-1">−</button>
        <button class="btn btn-sm btn-outline-secondary" data-id="${product.id}" data-delta="+1">＋</button>
      </div>
    `;
    li.querySelectorAll('button').forEach(btn => {
      const pid = btn.dataset.id;
      const d   = parseInt(btn.dataset.delta, 10);
      btn.addEventListener('click', () => updateCart(cart[pid].product, d));
    });
    ul.appendChild(li);
    sum += product.price * qty;
  });

  total.textContent = `${sum.toFixed(2)} VND`;
}

// Load cart
function refreshCart() {
  address.value = payment.value = '';
  Object.keys(cart).forEach(k => delete cart[k]);
  renderCart();
}


/* ===========================
   Commit order
   =========================== */

// Commit button
const commitBtn  = document.getElementById('commit-btn');
commitBtn.addEventListener('click', async () => {
  commitOrder();
});

// POST 'api/order/': Commit order
async function commitOrder() {
  let my_address = address.value.trim() || null;
  let my_payment = payment.dataset.value.trim() || null;
  let products = Object.values(cart).map(e => ({
    product: e.product,
    quantity:  e.qty
  }));

  products = products.length > 0? products : null;

  let orderMeta = {products, address: my_address, payment: my_payment};

  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ orderMeta })
    })
    const data = await res.json();

    // Authorization
    if (res.status === 401) {
      document.getElementById('openAuth').click();
      return;
    } 

    if (!res.ok) throw new Error(data.message || 'Add failed');
    else {
      showOrderModal();
      await refreshAll();
    }
  }

  catch (err) {
    showMessage(err.message);
  }
}

// Commit alert
const modal = document.getElementById('orderModal');
const closeIcon = document.getElementById('orderModalClose');
const okButton = document.getElementById('orderModalOk');

// Commit modal
function showOrderModal() {
  modal.style.display = 'flex';
}
function hideOrderModal() {
  modal.style.display = 'none';
}

// Close on “×” or “OK”
closeIcon.addEventListener('click', hideOrderModal);
okButton.addEventListener('click', hideOrderModal);

// Close if user clicks outside the content
modal.addEventListener('click', e => { if (e.target === modal) hideOrderModal(); });


/* ===========================
   Search engine
   =========================== */

let allProducts;
const searchInput = document.getElementById('product-search');
const suggList = document.getElementById('search-suggestions');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    suggList.style.display = 'none';
    renderGrid(allProducts);
    return;
  }
  // Find up to 5 name matches
  const matches = allProducts
    .filter(p => p.name.toLowerCase().includes(q))
    .slice(0, 10);

  // Build suggestions dropdown
  suggList.innerHTML = matches
    .map(p => `<li class="list-group-item list-group-item-action" data-id="${p.id}">${p.name}</li>`)
    .join('');
  suggList.style.display = matches.length > 0 ? 'block' : 'none';

  // When a suggestion is clicked
  suggList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      searchInput.value = li.textContent;
      suggList.style.display = 'none';
      // Render only the selected product
      const prod = allProducts.find(x => x.id == li.dataset.id);
      renderGrid(prod ? [prod] : []);
    });
  });
});


/* ===========================
   Helpers
   =========================== */

// Refresh page 
async function refreshAll() {
    await Promise.all([refreshCart()], [loadProducts()]);
}

// Helper to display messages
function showMessage(msg, type = 'danger') {
  messageEl.textContent = msg;
  messageEl.className = `alert alert-${type} mt-2`;
  setTimeout(() => {
    messageEl.textContent = '';
    messageEl.className = '';
  }, 5000);
}

// DOM response
document.addEventListener('DOMContentLoaded', refreshAll)


