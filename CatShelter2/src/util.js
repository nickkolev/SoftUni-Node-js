const fs = require('fs/promises');
const path = require('path');

async function readFile(path) {
    const fileHandle = await fs.open(path.join('./', path, 'r'));
    return fileHandle.createReadStream();
}

async function readTemplate(template) {
    const data = await fs.readFile(path.join('./views/', template + '.html'));
    return data.toString();
}

module.exports = {
    readFile,
    readTemplate
};