const productEl = document.getElementById('product-list');
const revEl    = document.getElementById('rev-value');

// Form fields
let idInput    = document.getElementById('prod-id');
let nameInput  = document.getElementById('prod-name');
let priceInput = document.getElementById('prod-price');
let qtyInput   = document.getElementById('prod-qty');

// Utils
const addBtn = document.getElementById('btn-add');
const updateBtn = document.getElementById('btn-update');
const removeBtn = document.getElementById('btn-delete');
addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
removeBtn.addEventListener('click', removeProduct);

document.addEventListener('DOMContentLoaded', async () => {
    // Loads product list
    await loadProducts();
})

// Add product 
async function addProduct() {
    let validation = await isAddValid();
    if (validation) {
        document.getElementById("message").textContent = validation; 
        return;
    }

    let productMeta =  {
        product_id: String(idInput.value.trim()),
        name:       String(nameInput.value.trim()),
        price:      parseFloat(priceInput.value),
        quantity:   parseInt(qtyInput.value, 10)
    };

    fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ productMeta })
    })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unknown error');
      }
      return data;
    })
    .then(data => {
      refreshAll();       // only refresh on success
    })
    .catch(err => {
      alert("a");
    });
}

async function isAddValid() {
    // Validate name
    if (nameInput.value.trim().length < 1) {
        return "A new product should have a name.";
    }
    // Validate price
    if (priceInput.value.trim().length < 1) {
        return "Please add price for the new product.";
    }

    return 0;
}

// Update product 
async function updateProduct() {

    document.getElementById('btn-update').onclick = () => {
        fetch(`/api/products/${encodeURIComponent(idInput.value)}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ quantity: parseInt(qtyInput.value, 10) })
        }).then(refreshAll);
    };
}

async function removeProduct() {
    document.getElementById('btn-delete').onclick = () => {
        fetch(`/api/products/${encodeURIComponent(idInput.value)}`, {
        method: 'DELETE'
        }).then(refreshAll);
    };
}

// Render item's html content
function renderCard(product) {
  // Get the product-card template, which defined in the product page
  const template = document.getElementById('product-template').content;
  const clone = document.importNode(template, true);

  // product card
  const card = clone.querySelector('.product-card');
  card.id = `product-${product.id}`;
  card.dataset.id = product.id;

  clone.querySelector('.product-image')
      .src = product.imageUrl || '/img/mochi.jpeg';
  clone.querySelector('.product-id').textContent = `ID: ${product.id}`;
  clone.querySelector('.product-name').textContent = `${product.name}`;
  clone.querySelector('.product-price').textContent = `$ ${product.price.toFixed(2)}`;
  clone.querySelector('.qty-value').textContent = `In stock: ${product.quantity}`;

  return clone;
}

// fetch & render products
async function loadProducts() {
    const res = await fetch('/api/products');
    const products = await res.json();
    productEl.innerHTML = '';
    products.forEach(p => {
    productEl.appendChild(renderCard(p));
    });
}

// fetch & render revenue
async function loadRevenue() {
    const res = await fetch('/api/revenue');
    const { total_revenue } = await res.json();
    revEl.textContent = `$${total_revenue.toFixed(2)}`;
}

// refresh both
async function refreshAll() {
    await Promise.all([loadProducts(), loadRevenue()]);
    // clear inputs
    nameInput.value = priceInput.value = qtyInput.value = '';
}



// initial load
refreshAll();

