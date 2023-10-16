import fs from 'fs';
import { __dirname } from '../utils.js';
import BasicManager from './BasicManager.js';
import { cartsModel } from '../db/models/carts.model.js';

class CartManager extends BasicManager {

    constructor(path) {
        super(cartsModel);
        this.path = path;
    }

    async addItemToCart(cartId, itemId) {
        try {
          const cart = await this.findById(cartId);
      
          if (!cart) {
            throw new Error("Cart not found");
          }
      
          const itemIndex = cart.cart.findIndex((item) => item.productId === itemId);
          
          if (itemIndex === -1) {
            cart.cart.push({ productId: itemId, quantity: 1 });
          } else {
            cart.cart[itemIndex].quantity += 1;
          }

          await this.updateOne(cartId, cart);
      
          return cart;
        } catch (error) {
          throw error;
        }
      };      

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

export const cartManager = new CartManager(__dirname + '/data/carritos.json');