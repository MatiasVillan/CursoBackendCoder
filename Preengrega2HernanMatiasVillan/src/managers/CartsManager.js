import BasicManager from './BasicManager.js';
import { cartsModel } from '../db/models/carts.model.js';
import { productsModel } from '../db/models/products.model.js';


class CartManager extends BasicManager {

  constructor(path) {
    super(cartsModel);
  }

  async addItemToCart(cartId, productId, quantity) {
    try {
      const cart = await this.findById(cartId);

      if (!cart) {
        throw new Error("El carrrito no existe.");
      }

      const existingProduct = cart.cart.find(item => item.product.equals(productId));

      if (existingProduct) {
        existingProduct.quantity = quantity ? quantity : +existingProduct.quantity + 1;
      } else {
        cart.cart.push({ product: productId, quantity: quantity ? quantity : 1 });
      }

      await cart.save();
      return cart;

    } catch (error) {
      throw error;
    }
  }

  async dropItemFromCart(cartId, productId) {
    try {
      const cart = await this.findById(cartId);

      if (!cart) {
        throw new Error("El carrito no existe");
      }

      const itemIndex = cart.cart.findIndex(item => item.product.equals(productId));

      if (itemIndex !== -1) {
        cart.cart.splice(itemIndex, 1);
        await cart.save();
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async emptyCart(cartId) {
    try {
      const cart = await this.findById(cartId);

      if (!cart) {
        throw new Error("No se encontró el carrito.");
      }

      cart.cart = [];
      await cart.save();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async findAllCarts() {
    return this.model.find().populate('cart.product').lean();
  }

  async showCart(cartId) {
    return this.model.findById(cartId).populate('cart.product').lean();
  }
}

export const cartManager = new CartManager();
