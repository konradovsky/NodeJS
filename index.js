/*
*
* Primary file
*
*/

// Dependecies

const http = require('http');

// The server should respond to all requests with a string

const server = http.createServer(function(req,res){
    res.end('Hello Word\n');
})

// Start the server, and have it listn on port 3000

server.listen(3000, () => {
    console.log('The server is listening on port 3000 now')
})