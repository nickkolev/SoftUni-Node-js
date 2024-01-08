const http = require("http");

const homeHtml = require('./views/home/index.js');
const siteCss = require('./content/styles/site.js');
const addBreedHtml = require('./views/addBreed.js');

const PORT = 5555;

const server = http.createServer((req, res) => {

    const { url } = req;

    console.log(url);

    if(url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        })
        res.write(homeHtml);
    } else if(url === "/content/styles/site.css") {
        res.writeHead(200, {
            "Content-Type": "text/css",
        });
        res.write(siteCss);
    } else if(url === "/cats/add-breed") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        })
        res.write(addBreedHtml);
    }

    res.write("Hello");
    res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));