const http = require('http');

const express = require('express');

const app = express();

app.use('/about', (req, res, next) => {
    res.send('<h1>About page</h1>'); // Just sends a response to the frontend
});
app.use('/', (req, res, next) => {
    res.send('<h1>Home Page</h1>'); // Just sends a response to the frontend
});

const server = http.createServer(app);

server.listen(3000);