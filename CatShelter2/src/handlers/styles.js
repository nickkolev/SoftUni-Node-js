const { readFile } = require("../util");

function stylesHandler(req, res) {
    const filename = req.url.split('/').pop();
    const styles = readFile(`content/styles/${filename}`);
    res.writeHead(200, [
        'Content-Type', 'text/css'
    ]);
    res.write(styles);
    res.end();
}

module.exports = {
    stylesHandler
};