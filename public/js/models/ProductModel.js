export default class ProductModel {
  constructor(base = '/api/product') {
    this.base = base;
  }

  // GET /api/products
  async listAll() {
    const res = await fetch(this.base);
    if (!res.ok) throw new Error(`List failed: ${res.status}`);
    return res.json();
  }

  // POST /api/products  { product_id, name, price, quantity }
  async add({ product_id, name, price, quantity }) {
    const res = await fetch(this.base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, name, price, quantity })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || res.statusText);
    }
    return res.json();
  }

  // DELETE /api/products/:id
  async remove(id) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    return res.json();
  }

  // PUT /api/products/:id  { add_quantity }
  async updateQuantity(id, add_quantity) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ add_quantity })
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    return res.json();
  }

  // GET /api/products/:id
  async findById(id) {
    const res = await fetch(`${this.base}/${id}`);
    if (!res.ok) throw new Error(`Not found: ${res.status}`);
    return res.json();
  }
}