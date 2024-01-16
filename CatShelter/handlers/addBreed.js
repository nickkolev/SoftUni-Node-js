const fs = require('fs/promises');
const path = require('path');
const formidable = require('formidable');

async function get(req, res) {
    const filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
    try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found');
        res.end();
    }
}
function post(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, field) => {
        try {
            if (err) {
                throw error;
            }
            const data = await fs.readFile('./data/breeds.json');
            let existing = JSON.parse(data);
            if (!existing.includes(field.breed)) {
                existing.push(field.breed);
                let updated = JSON.stringify(existing);
                await fs.writeFile('./data/breeds.json', updated, 'utf-8');
                res.writeHead(301, {
                    'Location': '/'
                })
                res.end();
            }
        } catch (error) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('404 Not Found');
            res.end();
        }
    })
}

const addBreedHandler = {
    get,
    post
}

module.exports = addBreedHandler;