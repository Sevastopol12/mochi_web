class Product {
  constructor({ id, name, price, quantity_in_stock }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity_in_stock = quantity_in_stock
  }

  getInfo() {
    return `${this.name} (ID: ${this.id}) $${this.price.toFixed(2)}`;
  }

  isInStock(quantity=1) {
    return this.quantity_in_stock >= quantity;
  }

}

export default Product;