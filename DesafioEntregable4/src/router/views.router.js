import { Router } from 'express';
import { productManager } from '../managers/ProductsManager.js';

const router = Router();

router.get('/view1', (req, res) => {
    res.render('view1');
});

router.get('/view2', (req, res) => {
    res.render('view2');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signupresponse/:id',async (req, res) => {
    const { id } = req.params;

    const product = await productManager.getProductById(+id);

    res.render('signupresponse', {product});
});

export default router;