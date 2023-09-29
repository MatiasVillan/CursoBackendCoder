import express from 'express';
import productsRouter from './src/router/products.router.js'
import cartRouter from './src/router/carts.router.js';
import viewsRouter from './src/router/views.router.js';
import { engine } from 'express-handlebars';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api', viewsRouter);

app.listen(8080, () => {
    console.log('Listening on 8080 - HTTP');
});