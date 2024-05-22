const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

module.exports = (req, res) => {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

    if(pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    } else if(pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    } else {
        return true;
    }
};