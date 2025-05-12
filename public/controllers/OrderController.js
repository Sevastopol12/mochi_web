export default class OrderController {
    constructor(base='/api/order') {
        this.base = base;
    }

    // POST: commit order
    async commitOrder() {
        let response = await fetch(this.base);
        if (!response.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText);
        }

        return response.json();
    }
}