const productEl = document.getElementById('product-list');
const revEl = document.getElementById('rev-value');
const messageEl = document.getElementById('message');

// Form fields
const idInput = document.getElementById('prod-id');
const nameInput = document.getElementById('prod-name');
const priceInput = document.getElementById('prod-price');
const qtyInput = document.getElementById('prod-qty');

// Buttons
const addBtn = document.getElementById('btn-add');
const updateBtn = document.getElementById('btn-update');
const removeBtn = document.getElementById('btn-delete');

// Event listeners
addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
removeBtn.addEventListener('click', removeProduct);

document.addEventListener('DOMContentLoaded', refreshAll);

// Helper to display messages
function showMessage(msg, type = 'danger') {
  messageEl.textContent = msg;
  messageEl.className = `alert alert-${type} mt-2`;
  setTimeout(() => {
    messageEl.textContent = '';
    messageEl.className = '';
  }, 5000);
}

async function addProduct() {
  // Validation
  if (!nameInput.value.trim()) return showMessage('Name is required');
  if (!priceInput.value.trim()) return showMessage('Price is required');

  const productMeta = {
    product_id: idInput.value.trim(),
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    quantity: parseInt(qtyInput.value, 10) || 0
  };

  try {
    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productMeta })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Add failed');
    showMessage(data.mess || 'Product added.', 'success');
    await refreshAll();
  } catch (err) {
    showMessage(err.message);
  }
}

async function updateProduct() {
  const id = idInput.value.trim();
  const quantity = parseInt(qtyInput.value, 10);
  if (!id || isNaN(quantity)) {
    return showMessage('Valid ID and quantity are required.');
  }
  try {
    const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showMessage(data.message, 'success');
    await refreshAll();
  } catch (e) { showMessage(e.message); }
}

async function removeProduct() {
  const id = idInput.value.trim();
  if (!id) return showMessage('ID is required.');
  try {
    const res = await fetch(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showMessage(data.message, 'success');
    await refreshAll();
  } catch (e) { showMessage(e.message); }
}


// Render and load
function renderCard(product) {
  const template = document.getElementById('product-template').content;
  const clone = document.importNode(template, true);
  const card = clone.querySelector('.product-card');
  card.id = `product-${product.id}`;
  clone.querySelector('.product-image').src = product.imageUrl || '/img/mochi.jpeg';
  clone.querySelector('.product-id').textContent = `ID: ${product.id}`;
  clone.querySelector('.product-name').textContent = product.name;
  clone.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
  clone.querySelector('.qty-value').textContent = `In stock: ${product.quantity}`;
  return clone;
}

async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  productEl.innerHTML = '';
  products.forEach(p => productEl.appendChild(renderCard(p)));
}

async function loadRevenue() {
  const res = await fetch('/api/revenue');
  let { total_revenue } = await res.json();
  revEl.textContent = `$${total_revenue.toFixed(2)}`;
}

async function refreshAll() {
  await Promise.all([loadProducts(), loadRevenue()]);
  idInput.value = nameInput.value = priceInput.value = qtyInput.value = '';
}