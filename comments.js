//create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var comments = [];

http.createServer(function(req, res){
    //parse url
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    //parse query
    var query = urlObj.query;
    //handle static resource request
    if(pathname === '/'){
        pathname = '/index.html';
    }
    var extname = path.extname(pathname);
    if(pathname !== '/favicon.ico'){
        fs.readFile('static/' + pathname, function(err, data){
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            }
            var mime = getMime(extname);
            res.writeHead(200, {'Content-Type': mime});
            res.end(data);
        });
    }
    //handle ajax request
    if(pathname === '/comment'){
        var str = '';
        req.on('data', function(chunk){
            str += chunk;
        });
        req.on('end', function(){
            var obj = querystring.parse(str);
            comments.push(obj);
            res.end(JSON.stringify(comments));
        });
    }
}).listen(8080);

function getMime(extname){
    switch(extname){
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/html';
    }
}
console.log('Server is running at http://')
