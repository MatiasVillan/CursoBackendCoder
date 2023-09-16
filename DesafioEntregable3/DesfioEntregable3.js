import express from 'express';
import { productManager } from './ProductsManager.js';

const app = express();

app.get('/api/products',async(req,res)=>{
    try {
        const products = await productManager.getProducts(req.query);
        console.log(products);

        if(!products.length) {
            return res.status(200).json({message: 'No existen productos.'});
        }

        return res.status(200).json({message: "Productos encontrados:", products});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/api/products/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await productManager.getProductById(+id);
           
        if( Object.keys(product).length === 0 ){
            return res.status(400).json({message: 'No existe el producto.'});
        }

        res.status(200).json({message: "Producto encontrado:", product});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
} )

app.listen(8080, ()=>{
    console.log('Escuchando al puerto 8080');
});