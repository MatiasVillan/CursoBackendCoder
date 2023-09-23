import express from 'express';
import productsRouter from './router/products.router.js';
//import cartRouter from './router/carts.router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
//app.use('/api/cart', cartRouter);

app.listen(8080, () => {
    console.log('Listening on 8080 - HTTP');
});