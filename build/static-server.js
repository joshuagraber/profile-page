const http = require('http');
const url = require('url');
const fs = require('fs');
const mimeCheck = require('mime');
const port = 3000;

const server = http.createServer( (req, res) => {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path.replace(/^\/+|\/+$/g, '');
    
    if (path == '') {
        path = 'index.html';
    }
    console.log(`Requested path: ${path}`);

    let file = __dirname + "/" + path;

    fs.readFile(file, function(err, content) {
        if (err) {
            console.log(`File not found: ${file}`);
            res.writeHead(404);
            res.end();
        } else {
            console.log(`Returning ${path}`);
            res.setHeader('X-Content-Type-Options', 'nosniff');

            //Uses mime to get MIME type of file
            let mime = mimeCheck.getType(path);
            res.writeHead(200, {"Content-type": mime});

            res.end(content);
        }
    })
})

server.listen(port, "localhost", function(error) {
    if (error) {
        console.log('Something went wrong');
    } else {
        console.log('Server is listening on port' + port);
    }
})
