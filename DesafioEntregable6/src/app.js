import express from 'express';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import { productManager } from './managers/ProductsManager.js';
import "./db/configDB.js"
import { messagesManager } from './managers/MessagesManager.js';
import session from "express-session";
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const uri = "mongodb+srv://coderfs:c0d3rfs@cluster0.kykyjfg.mongodb.net/ecommerce?retryWrites=true&w=majority";

app.use(session({
    secret: "SECRETKEY",
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new MongoStore({ mongoUrl: uri })
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use("/api/users", usersRouter);
app.use('/api', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on ${PORT} - HTTP`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log("Client connected", socket.id);

    socket.on('createProduct', async (product) => {
        //const newProduct = await productManager.addProduct(product);
        const newProduct = await productManager.createOne(product);
        if (newProduct.id)
            socket.emit('productCreated', newProduct);
    })

    socket.on('newUser', (user) => {
        socket.broadcast.emit("newUserBroadcast", user);
    });

    socket.on('message', async (info) => {
        await messagesManager.createOne(info);
        const messages = await messagesManager.findAll();

        socketServer.emit('chat', messages);
    });
});