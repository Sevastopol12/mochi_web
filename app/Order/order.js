class Order {
    constructor(id, products, date) {
        this.id = id;
        this.date = date;
        this.products = products;
        this.total = 0;
        this.payment = null;
        this.status = 0; // 0 for on-going, 1 for delivered
    }

    orderDetail() {
        return this;
    }

    calculateTotal() {
        let total = 0;
        this.products.array.forEach(x => {total += x.price;});
        this.total = total;
        
        return this;
    }

    assignPaymentMethod(method) {
        this.payment = method;
        return this;
    }

    processOrder() {
        if (this.products.length < 1) {return 'Products cannot be empty ';}
        if (this.total ===0) {return 'total price cannot be 0';}
        if (this.payment === null) {return 'No payment method selected';}
        return this;
    }

}