const fs = require('fs');

function readFile(path) {
    const data = fs.readFileSync(path);
    return data.toString();
}
// just for the commit 
module.exports = {
    readFile
};