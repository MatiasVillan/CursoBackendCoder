import http from 'http';
const server = http.createServer();

server.listen(8080, ()=>{
    console.log('Listening on 8080 - HTTP');
});