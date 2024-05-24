const url = require('url');
const formidable = require('formidable');
const fs = require('fs-extra');
const path = require('path');
const qs = require('querystring');
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
            let catBreedPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);
            res.write(modifiedData);
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
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            console.log(body);

            fs.readFile('./data/breeds.json', (err, data) => {
                if(err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);

                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log('The breed was uploaded successfully!'));
            });
        });

        res.writeHead(301, {
            location: '/'
        });

        res.end();
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('An error occurred while processing the form.');
                return;
            }

            console.log('Fields:', fields);
            console.log('Files:', files);

            if (!files.upload) {
                console.error('No file was uploaded');
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('No file was uploaded.');
                return;
            }

            const uploadedFile = files.upload[0];

            const oldPath = uploadedFile.filepath;
            const newPath = path.normalize(path.join(__dirname, '../content/images/' + uploadedFile.newFilename));

            fs.copy(oldPath, newPath, (err) => {
                if (err) {
                    console.error('File copy error:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('An error occurred while saving the file.');
                    return;
                }

                console.log('File was uploaded successfully!');

                fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                    if (err) {
                        console.error('File read error:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('An error occurred while reading the data.');
                        return;
                    }

                    const allCats = JSON.parse(data);
                    allCats.push({ id: allCats.length + 1, ...fields, image: files.upload.name });

                    const json = JSON.stringify(allCats);

                    fs.writeFile('./data/cats.json', json, (err) => {
                        if (err) {
                            console.error('File write error:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('An error occurred while saving the data.');
                            return;
                        }

                        console.log('The cat was uploaded successfully!');

                        res.writeHead(301, { location: '/' });
                        res.end();
                    });
                });
            });
        });
    } else {
        return true;
    }
};