const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home", { layout: false });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
