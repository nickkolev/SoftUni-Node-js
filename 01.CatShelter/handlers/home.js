const fs = require('fs/promises');
const path = require('path');

const { catsTemplate } = require('../util/template');

async function get(req, res) {
    const filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
    try {
        let data = await fs.readFile(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const layout = data.toString().replace('{{cats}}', catsTemplate);
        res.write(layout);
        res.end();
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
}

const homeHandler = {
    get
};

module.exports = homeHandler;