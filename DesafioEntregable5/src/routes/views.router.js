import { Router } from 'express';
import { productManager } from '../managers/ProductsManager.js';

const router = Router();

router.get('/home', async (req, res) => {
    //const products = await productManager.getProducts({});
    const products = await productManager.findAll();

    res.render('home', { products: products });
});

router.get('/realtime', async (req, res) => {
    //const products = await productManager.getProducts({});
    const products = await productManager.findAll();
    res.render('realTimeProducts', { products: products });
});

export default router;