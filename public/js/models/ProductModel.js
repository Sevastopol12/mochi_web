export default class ProductModel {
  constructor(base = '/api/products') {
    this.base = base;
  }
  // GET
  async listAll() {
    let response = await fetch(this.base);
    if (!response.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || res.statusText);
    }

    return response.json();
  }
}