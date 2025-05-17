/**
 * Declare a Product Object
 */

class Product {
  constructor({ id, name, price, quantity, description }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description
  }

  getInfo() {
    return `${this.name} (ID: ${this.id}) $${this.price.toFixed(2)}`;
  }

  // Validate whether the product is in-stock
  isInStock(quantity=1) {
    return this.quantity >= quantity;
  }

}

export default Product;