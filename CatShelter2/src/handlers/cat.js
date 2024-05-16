const cats = require("../../data/cats.json");
const breeds = require("../../data/breeds.json");
const { readFile } = require("../util");

function catsHandler(req, res) {
    const pathname = req.url;
    if(pathname === '/cats/add-cat' && req.method === 'GET') {
        const html = readFile('views/addCat.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(html);
        res.end();
    } else if(pathname === '/cats/add-breed' && req.method === 'GET') {
        const html = readFile('views/addBreed.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(html);
        res.end();
    } else if(pathname === '/cats/add-breed' && req.method === 'POST') {
        //TODO
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('404 Not Found');
        res.end();
    }
}

module.exports = {
    catsHandler
};