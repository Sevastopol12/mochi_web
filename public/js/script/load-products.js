import ProductModel from '../models/ProductModel.js'

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('product-list');
  const model = new ProductModel();
  const products = await model.listAll();
  
  if (products.length < 1) {
    container.innerHTML = "<p> No product to display. </p>";
  }
  try {
    products.foreach(product => container.appendChild(renderCard(product)))
    return container;
  }
  catch(err) {
    console.error('Error loading products or template:', err);
    container.innerHTML = "<p>Error loading products.</p>";
  }
})

function renderCard(product) {
  const template = document.getElementById('product-template').content;
  const clone = document.importNode(template, true);

  const card = clone.querySelector('.product-card');
  card.id = `product-${product.id}`;
  card.dataset.id = product.id;

  clone.querySelector('.product-name').textContent = product.name;
  clone.querySelector('.product-price').textContent = product.price;
  clone.querySelector('.qty-value').textContent = product.quantity;

  clone.querySelectorAll('.qty-btn').forEach(btn => {
    btn.dataset.id = product.id;
  });

  return clone;
}