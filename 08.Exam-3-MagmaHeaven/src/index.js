const express = require('express');
const mongoose = require("mongoose");

const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');
const routes = require('./routes');

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

app.use(routes);

// TODO: change database name
mongoose.connect("mongodb://localhost:27017/course-book")
    .then(() => {
        console.log('DB connected!');
        app.listen(port, () => { 
            console.log(`Server is running on port ${port}...`);
        });
    })
    .catch(err => {
        console.error('DB error: ', err);
    });