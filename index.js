const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const _data = require('./lib/data');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');



// 1. Build Server
const server = http.createServer((req,res) => {

    // 2. Take and parse url string
    const parsedUrl = url.parse(req.url, true);

    // 3. Get method
    const method = req.method.toLowerCase();

    // 4.Get query string object
    const queryStringObject = req.queryObject;

    // 5. Get and trim path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // 6. Get headers 
    const headers = req.headers;

    // 7. Handling the payload
    const decoder = new StringDecoder('utf-8');
    
    let buffer = ''

    req.on('data', data => {
        buffer += decoder.write(data);
    })

    req.on('end', () => {
        buffer += decoder.end();

        // 8.4 Choose the handler request should go to
        let choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ?  router[trimmedPath] : handlers.notFound;

        // 8.5 Construct data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        // 8.6 Route the request to the handler specified in the router
        choosenHandler(data, function(statusCode, payload) {

            // 8.7 Use the status code calleback by the handler, or default 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
    
            // 8.8 Use the payload called back by the handler, or default to {}
            payload = typeof(payload) == 'object' ? payload : {};
            
            // 8.9 Convert the payload to a string
            let payloadString = JSON.stringify(payload);

            // 8.10 Return the responce
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Request recievied a payload:', statusCode, payloadString);
            
        });
    });

    // 8.1 Define a request router
    const router = {
        'ping': handlers.ping,
        'users': handlers.users
    }
})

server.listen(config.port, () => {
    console.log('Server is listening on port', config.port, config.envName );
})
