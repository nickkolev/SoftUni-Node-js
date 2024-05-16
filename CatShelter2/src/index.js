const http = require('http');
const port = 3000;
const { homeHandler } = require('./handlers/home');
const { stylesHandler } = require('./handlers/styles');
const { catsHandler } = require('./handlers/cat');

const routes = {
    '/': homeHandler,
    '/home': homeHandler,
    '/cats/add-cat': catsHandler,
    '/cats/add-breed': catsHandler,
};

http.createServer((req, res) => {
    const route = routes[req.url];
    if (typeof route === 'function') {
        route(req, res);
    } else if (req.url.endsWith('.css')) {
        stylesHandler(req, res);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('404 Not Found');
        res.end();
    }
}).listen(port);