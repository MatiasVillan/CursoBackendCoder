import { Router } from 'express';
import { productManager } from '../managers/ProductsManager.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query);

        if (!products.length) {
            return res.status(200).json({ message: 'No existen productos.' });
        }

        return res.status(200).json({ message: "Productos encontrados:", products });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(+id);

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
        const product = await productManager.addProduct(req.body);

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
        const deleted = await productManager.delProduct(+id);

        if (deleted !== 1) {
            return res.status(400).json({ message: 'No se pudo eliminar el producto inexistente.' });
        }

        return res.status(200).json({ message: "Producto eliminado con exito." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updated = await productManager.updateProduct(+id, req.body);

        if (updated !== 1) {
            return res.status(400).json({ message: 'No se pudo actualizar el producto inexistente.' });
        }

        return res.status(200).json({ message: "Producto actualizado con exito." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

export default router;