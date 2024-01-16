const fs = require('fs/promises');
const path = require('path');
const formidable = require('formidable');
const { breedsTemplate } = require('../util/template');
const getCats = require('../util/data.js')

async function get(req, res) {
    const filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));
    try {
        const data = await fs.readFile(filePath);
        const { cats, cat } = await getCats(req);
        const template = breedsTemplate.map(x => {
            if (x.includes(cat.breed)) {
                return `<option value="${cat.breed}" selected>${cat.breed}</option>`;
            }
            return x;
        }).join('');

        const layout = data.toString()
            .replace('{{id}}', cat.id)
            .replace('{{id}}', cat.id)
            .replace('{{name}}', cat.name)
            .replace('{{description}}', cat.description)
            .replace('{{breed}}', cat.breed)
            .replace('{{image}}', `${path.join('/content/images/' + cat.image)}`)
            .replace('{{breeds}}', template);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
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
                throw error;
            }
            const { cats, cat } = await getCats(req);
            Object.assign(cat, fields);

            if (file.upload.name != '') {
                cat.image = file.upload.name;

                const oldPath = file.upload.path;
                const newPath = path.normalize(path.join(__dirname, '../content/images', file.upload.name));
                await fs.copyFile(oldPath, newPath);
                await fs.unlink(oldPath);
            }

            const updated = JSON.stringify(cats, null, 2);
            await fs.writeFile('./data/cats.json', updated, 'utf-8');
            res.writeHead(301, {
                'Location': '/'
            })
            res.end();
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    })
}

async function del(req, res) {
    try {
        const { cats, cat } = await getCats(req);
        const left = cats.filter(c => c.id != cat.id);
        const updated = JSON.stringify(left, null, 2);

        await fs.writeFile('./data/cats.json', updated, 'utf-8');

        const filePath = path.normalize(path.join(__dirname, '../content/images/', cat.image));
        await fs.unlink(filePath);
        res.writeHead(301, {
            'Location': '/'
        })
        res.end();
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
}

const editCatHandler = {
    get,
    post,
    del
}

module.exports = editCatHandler;