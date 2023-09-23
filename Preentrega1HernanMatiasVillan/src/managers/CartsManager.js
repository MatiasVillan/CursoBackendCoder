import fs from 'fs';

class CartManager {

    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8');
                const cartList = JSON.parse(info);
                return cartList;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    async getCartById(id) {
        try {
            const cartList = await this.getCarts();
            const cart = cartList.find(c => c.id === id);

            if (!cart)
                throw new Error('NOT FOUND.');

            return cart;

        } catch (error) {
            return error;
        }
    }

    async addCart() {

        try {
            const carts = await this.getCarts();
            const id = this.#makeId(carts);

            carts.push({ id: id, products: [] });
            await fs.promises.writeFile(this.path, JSON.stringify(carts));

            return id;

        } catch (error) {
            return error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cartList = await this.getCarts();
            const cartIndex = cartList.findIndex(c => c.id === cid);

            const productList = cartList[cartIndex].products;
            const productIndex = productList.findIndex(p => p.product === pid);

            if (productIndex === -1) {
                cartList[cartIndex].products.push({
                    "product": pid,
                    "quantity": 1
                });
            } else {
                cartList[cartIndex].products[productIndex].quantity += 1;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(cartList));
            return cartList[cartIndex];

        } catch (error) {
            return error;
        }
    }

    #makeId(carts) {
        if (carts.length)
            return carts[carts.length - 1].id + 1;
        else
            return 1;
    }
}

export const cartManager = new CartManager('./src/data/carritos.json');