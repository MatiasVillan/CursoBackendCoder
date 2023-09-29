import express from 'express';
import productsRouter from './src/router/products.router.js'
import cartRouter from './src/router/carts.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => {
    console.log('Listening on 8080 - HTTP');
});