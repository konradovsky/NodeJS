/*
*
* Primary file
*
*/

// Dependecies

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string

const server = http.createServer(function(req,res){

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')

    // Get the query string as an object
    const queryStringobject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload if there is any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data => buffer += decoder.write(data));
    req.on('end', () => {

        buffer += decoder.end()

        // Send the response
        res.end('Hello Word\n');

        // Log the request path
        console.log('Req recievied with this payload', buffer);
    });


})

// Start the server, and have it listn on port 3000

server.listen(3000, () => {
    console.log('The server is listening on port 3000 now')
})