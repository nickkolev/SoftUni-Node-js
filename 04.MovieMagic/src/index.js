const express = require("express");

const configHandlebars = require("./config/configHandlebars");
const configExpress = require("./config/configExpress");
const routes = require("./routes");

const app = express();
const port = 3000;

configHandlebars(app);
configExpress(app);

app.use(routes);

app.listen(port, () => { 
    console.log(`Server is running on port ${port}...`);
});
