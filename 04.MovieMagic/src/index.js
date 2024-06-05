const express = require("express");

const mongoose = require("mongoose");
const configHandlebars = require("./config/configHandlebars");
const configExpress = require("./config/configExpress");
const routes = require("./routes");

const app = express();
const port = 3000;

configHandlebars(app);
configExpress(app);

app.use(routes);

mongoose.connect("mongodb://localhost:27017/magic-movies")
    .then(() => {
        console.log('DB connected!');
        // понякога искаме да се уверим, че сме свързани към базата данни преди да стартираме сървъра
        // понеже базата данни се свързва асинхронно, може да се случи да стартираме сървъра преди да сме свързани към базата данни
        app.listen(port, () => { 
            console.log(`Server is running on port ${port}...`);
        });
    })
    .catch(err => {
        console.error('DB error: ', err);
    });