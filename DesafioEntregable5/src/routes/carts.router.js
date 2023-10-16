import { Router } from 'express';
import { cartManager } from '../managers/CartsManager.js'
import { productManager } from '../managers/ProductsManager.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        //const cart = await cartManager.addCart();

        const cart = await cartManager.createOne();

        return res.status(200).json({ message: "Se creo correctamente el carrito", id: cart });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        //const product = await productManager.getProductById(+pid);
        const product = await productManager.findById(pid);

        if (Object.keys(product).length === 0) {
            return res.status(400).json({ message: 'No existe el producto que quiere agregar.' });
        }

        //const cart = await cartManager.getCartById(+cid);
        const cart = await cartManager.findById(cid);

        if (Object.keys(cart).length === 0) {
            return res.status(400).json({ message: 'No existe un carrito con ese id.' });
        }
        
        const addedProduct = await cartManager.addItemToCart(cid, pid);


        return res.status(200).json({ message: "Se agrego correctamente el producto al carrito.", product: product, cart: addedProduct });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


router.get('/', async (req, res) => {
    try {
        /* const carts = await cartManager.getCarts();

        if (Object.keys(carts).length === 0) {
            return res.status(400).json({ message: 'No existe ningun carrito.' });
        } */

        const carts = await cartManager.findAll();

        return res.status(200).json({ message: "Mostrando todos los carritos:", carts });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        /* const cart = await cartManager.getCartById(+id);

        if (Object.keys(cart).length === 0) {
            return res.status(400).json({ message: 'No existe un carrito con ese id.' });
        } */

        const cart = await cartManager.findById(id);

        return res.status(200).json({ message: "Mostrando carrito:", cart });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

export default router;