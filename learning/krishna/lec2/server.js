const http = require('http');

http.createServer((req, res) => {
    console.log(req.url); // Log the request URL for debugging
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello");
}).listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
