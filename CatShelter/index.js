const http = require("http");

const homeHtml = require("./views/home/index.js");
const siteCss = require("./content/styles/site.js");
const addBreedHtml = require("./views/addBreed.js");
const catTemplate = require("./views/home/catTemplate.js");

const PORT = 5555;

const cats = [
    {
        imageUrl: "",
        name: "Tsunami",
        breed: "Ulichna3",
        description: "Very cute cat!3",
    },
    {
        imageUrl: "",
        name: "Pesho",
        breed: "Ulichna2",
        description: "Very cute cat!2",
    },
    {
        imageUrl: "",
        name: "Valio",
        breed: "Ulichna4",
        description: "Very cute cat!4",
    },
    {
        imageUrl: "",
        name: "Niki",
        breed: "Ulichna1",
        description: "Very cute cat!1",
    },
];

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/") {
        const imageUrlPattern = /{{imageUrl}}/g;
        const namePattern = /{{name}}/g;
        const breedPattern = /{{breed}}/g;
        const descriptionPattern = /{{description}}/g;

        const catHtml = cats.map((cat) =>
            catTemplate
                .replace(imageUrlPattern, cat.imageUrl)
                .replace(namePattern, cat.name)
                .replace(breedPattern, cat.breed)
                .replace(descriptionPattern, cat.description)
        );
        const homeHtmlTemplate = homeHtml.replace("{{cats}}", catHtml);

        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(homeHtmlTemplate);
    } else if (url === "/content/styles/site.css") {
        res.writeHead(200, {
            "Content-Type": "text/css",
        });
        res.write(siteCss);
    } else if (url === "/cats/add-breed") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(addBreedHtml);
    }

    res.write("Hello");
    res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
