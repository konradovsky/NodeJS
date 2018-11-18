const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
     console.log("Inside a middeleware");
     next();
});

app.use((req, res, next) => {
    res.send("<h1>Hello from middleware</h1>");
}); 

app.listen(3000);