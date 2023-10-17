import { Router } from 'express';
import { productManager } from '../managers/ProductsManager.js';
import { messagesModel } from '../db/models/messages.model.js';
import BasicManager from '../managers/BasicManager.js';

const router = Router();
const messagesManager = new BasicManager(messagesModel);

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

router.get('/chat', async (req, res) => {
    const messages = await messagesManager.findAll();
    res.render('chat', { messages: messages });
});

export default router;