const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input name="title" type="text"><button type="submit">Send</button></form>'); // Just sends a response to the frontend
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Home Page</h1>'); // Just sends a response to the frontend
});

const server = http.createServer(app);

server.listen(3000);