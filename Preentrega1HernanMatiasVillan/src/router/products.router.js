import { Router } from 'express';
import { productManager } from '../managers/ProductsManager.js';

const router = Router();

router.get('/',async(req,res)=>{
    try {
        const products = await productManager.getProducts(req.query);

        if(!products.length) {
            return res.status(200).json({message: 'No existen productos.'});
        }

        return res.status(200).json({message: "Productos encontrados:", products});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
});

router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await productManager.getProductById(+id);

        if( Object.keys(product).length === 0 ){
            return res.status(400).json({message: 'No existe el producto.'});
        }

        return res.status(200).json({message: "Producto encontrado:", product});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
} )

export default router;