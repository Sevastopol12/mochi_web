import BaseAccount from "./base.js";

class User extends BaseAccount {
    constructor(username, password, email, phone_number) {
        super(username, password, email, phone_number);
        this.role = 'user';
        this.cart = [];
        this.orders = [];
    }

    displayInfo() {
        super.displayInfo();
    }

    addItem(product, quantity=1) {
        this.cart.push({product, quantity})
        return this
    }

    clearCart() {
        this.cart = [];
        return this;
      }
}

export default User;