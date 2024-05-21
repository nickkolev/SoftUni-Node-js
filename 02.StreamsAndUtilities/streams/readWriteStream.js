const fs = require('fs');
const { EOL } = require('os');

const readStream = fs.createReadStream('./data/input.txt', { encoding: 'utf-8', highWaterMark: 1000 });
const writeStream = fs.createWriteStream('./data/copy.txt', 'utf-8');

readStream.on('data', (chunk) => {
    writeStream.write('----- new chunk ----'  + EOL);
    writeStream.write(chunk);
    writeStream.write(EOL);
});

readStream.on('close', () => {
    writeStream.end();
});