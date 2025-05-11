import ProductModel from '../models/ProductModel.js'

/**
 * Built on AJAX/webservice's convention. Loads the product-list element internally.
*/

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('product-list');
  const model = new ProductModel();

  // Fetch products
  try {
    const products = await model.listAll();

    // No products
    if (!products || products.length < 1) {
      container.innerHTML = "<p> No product to display. </p>";
    }

    container.innerHTML = '';
    products.forEach(product => {
      const product_element = renderCard(product);
      container.appendChild(product_element);
    })
  }

  catch(err) {
    console.error('Error loading products or template:', err);
    container.innerHTML = "<p>Error loading products.</p>";
  }

})

function renderCard(product) {
  // Get the product-card template, which defined in the product page
  const template = document.getElementById('product-template').content;
  const clone = document.importNode(template, true);

  // product card
  const card = clone.querySelector('.product-card');
  card.id = `product-${product.id}`;
  card.dataset.id = product.id;

  clone.querySelector('.product-name').textContent = product.name;
  clone.querySelector('.product-price').textContent = `$ ${product.price.toFixed(2)}`;
  clone.querySelector('.qty-value').textContent = 0;

  clone.querySelectorAll('.qty-btn').forEach(btn => {
    btn.dataset.id = product.id;
    btn.addEventListener('click', () => updateQty(product.id, parseInt(btn.dataset.delta, 10)));
  });

  return clone;
}


// Update quantity
function updateQty(productId, delta) {
  // cart[productId] = cart[productId] || { qty: 0 };
  // cart[productId].qty += delta;
  // ensure qty >= 0
  // rerender the specific card qty-value:
  const card = document.getElementById(`product-${productId}`);
  if (!card) return;
  const qtySpan = card.querySelector('.qty-value');
  let qty = parseInt(qtySpan.textContent, 10) || 0;
  qty = Math.max(0, qty + delta);
  qtySpan.textContent = qty;
}
