/* const http = require('http');

const server = http.createServer();

 server.listen(8080, ()=>{
    console.log('Escuchando al puerto 8080');
 }); */

import express from "express";

const app = express();

app.get('/',(req,res) => { res.send('HOLA'); });
app.get('/pagina',(req,res) => { res.send('HOLA HOLA'); });

app.listen(8080, ()=>{
    console.log('escuchando 8080');
});