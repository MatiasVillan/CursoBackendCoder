import BasicManager from './BasicManager.js';
import { cartsModel } from '../db/models/carts.model.js';
import { productsModel } from '../db/models/products.model.js';


class CartManager extends BasicManager {

  constructor(path) {
    super(cartsModel);
  }

  async addItemToCart(cartId, productId) {
    try {
      const cart = await this.findById(cartId);

      if (!cart) {
        throw new Error("Cart not found");
      }

      const existingProduct = cart.cart.find(item => item.product.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.cart.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      return cart;
      
    } catch (error) {
      throw error;
    }
  }

  async findAllCarts() {
    return this.model.find().populate('cart.product').lean();
  }
}

export const cartManager = new CartManager();
