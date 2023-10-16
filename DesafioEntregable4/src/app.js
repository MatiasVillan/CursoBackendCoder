import express from 'express';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import { productManager } from './managers/ProductsManager.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on ${PORT} - HTTP`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log("Client connected", socket.id);

    socket.on('createProduct', async (product) => {
        
        const newProduct = await productManager.addProduct(product);
        if (newProduct.id)
            socket.emit('productCreated', newProduct);
        
    })
})