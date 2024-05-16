const cats = require("../../data/cats.json");
const homeTemplate = require('../../views/home/index.html.js');

function homeHandler(req, res) {
    res.writeHead(200, [
        'Content-Type', 'text/html'
    ]);
    res.write(homeTemplate(cats));
    res.end();
}

module.exports = {
    homeHandler
};