const http = require('http');
const url = require('url');

// 1. Build a server
const server = http.createServer((req,res) => {

    // 2. Take and parse the request url 
    const parsedUrl = url.parse(req.url, true);

    // 3. Take query strings from the request url
    const queryStringobject = parsedUrl.query;

    // 4. Make a path and trim it with regEx
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // 5. Get the HTTP method
    const method = req.method.toLowerCase();

    // 6. Get headers as an object
    const headers = req.headers;

    
    
    console.log(path + 'This is path')


    res.end('Hello Word\n');

})

server.listen(3009, () => console.log('Działa'));

/*
    1. Build a server
    2. Take and parse the request url 
    3. Take query strings from the request url
    4. Make a path and trim it with regEx
    5. Get the HTTP method
    6. Get headers as an object

*/