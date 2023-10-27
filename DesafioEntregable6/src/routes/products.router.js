import { Router } from 'express';
import { productManager } from '../managers/ProductsManager.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.findAllProducts(req.query);

        console.log('products', products)

        return res.status(200).json({ message: "Productos encontrados:", products });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.findById(id);

        if (Object.keys(product).length === 0) {
            return res.status(400).json({ message: 'No existe el producto.' });
        }

        return res.status(200).json({ message: "Producto encontrado:", product });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const {title, price, code } = req.body;

        if (!title || !price || !code)
            return res.status(400).json({message: 'Faltan datos criticos.'});

        const product = await productManager.createOne(req.body);

        if (Object.keys(product).length === 0) {
            return res.status(400).json({ message: 'No se pudo crear el producto.' });
        }

        return res.status(200).json({ message: "Producto creado con exito.", product });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await productManager.deleteOne(id);

        return res.status(200).json({ message: "Producto eliminado con exito." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updated = await productManager.updateOne(id, req.body);

        return res.status(200).json({ message: "Producto actualizado con exito." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

export default router;