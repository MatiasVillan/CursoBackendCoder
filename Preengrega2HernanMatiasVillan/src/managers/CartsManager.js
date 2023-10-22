import BasicManager from './BasicManager.js';
import { cartsModel } from '../db/models/carts.model.js';


class CartManager extends BasicManager {

    constructor(path) {
        super(cartsModel);
    }

    async addItemToCart(cartId, itemId) {
        try {
          const cart = await this.findById(cartId);
      
          if (!cart) {
            throw new Error("Cart not found");
          }
      
          const itemIndex = cart.cart.findIndex((item) => item.product === itemId);
          
          if (itemIndex === -1) {
            cart.cart.push({ product: itemId, quantity: 1 });
          } else {
            cart.cart[itemIndex].quantity += 1;
          }

          await this.updateOne(cartId, cart);
      
          return cart;
        } catch (error) {
          throw error;
        }
      };      

      async findAllCarts() {
        return this.model.find().populate('cart').lean();
    }
}

export const cartManager = new CartManager();