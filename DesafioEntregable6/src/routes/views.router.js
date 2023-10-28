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

router.get('/chat', (req, res) => {
    res.render('chat');
});

router.get('/', (req,res) => {
    res.render("login");
});

router.get('/signup', (req,res) => {
    res.render("signup");
});

export default router;