const fs = require('fs/promises');
const path = require('path');
const { breedsTemplate } = require('../util/template');
const getCats = require('../util/data.js')


async function get(req, res) {
    const filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));
    try {
        const data = await fs.readFile(filePath);
        const { cats, cat } = await getCats(req);
        const template = breedsTemplate.map(x => {
            if (x.includes(cat.breed)) {
                return `<option value="${cat.breed}" selected>${cat.breed}</option>`;
            }
            return x;
        }).join('');
        let layout = data.toString()
            .replace('{{id}}', cat.id)
            .replace('{{name}}', cat.name)
            .replace('{{description}}', cat.description)
            .replace('{{breed}}', cat.breed)
            .replace('{{image}}', `${path.join('/content/images/' + cat.image)}`)
            .replace('{{breeds}}', template);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        console.log(layout)
        res.write(layout);
        res.end();
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
}

async function post(req, res) {
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

const catShelterHandler = {
    get,
    post
}

module.exports = catShelterHandler;