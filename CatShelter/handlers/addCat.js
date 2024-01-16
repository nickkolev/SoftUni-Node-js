const fs = require('fs/promises');
const path = require('path');
const formidable = require('formidable');

const { breedsTemplate } = require('../util/template');

async function get(req, res) {
    const filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
    try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const layout = data.toString().replace('{{breeds}}', breedsTemplate.join(''));
        res.write(layout);
        res.end();
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
}

function post(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, file) => {
        try {
            if (err) {
                throw err;
            }
            const oldPath = file.upload.path;
            const newPath = path.normalize(path.join(__dirname, '../content/images', file.upload.name));
           
            await fs.copyFile(oldPath, newPath);
            await fs.unlink(oldPath);

            const data=await fs.readFile('./data/cats.json');

            let existing = JSON.parse(data);
            const body = Object.assign({}, fields, { image: file.upload.name });
            body.id = setId(existing.length);
            existing.push(body);
            let updated = JSON.stringify(existing, null, 2);

            await  fs.writeFile('./data/cats.json', updated, 'utf-8');

            res.writeHead(301, {'Location': '/'});
            res.end();
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    })
}

const addCatHandler = {
    get,
    post
}
module.exports = addCatHandler;

// random id generator
function setId(num) {
    let id = ('00000000' + (Math.random() * 99999999 * num | 0).toString(16)).slice(-8);

    return id;
}