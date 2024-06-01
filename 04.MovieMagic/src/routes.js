const router = require("express").Router();

const homeController = require("./controllers/homeController");
const movieController = require("./controllers/movieController");

router.use(movieController);
router.use(homeController);

router.get("*", (req, res) => {
    res.redirect("/404");
});

module.exports = router;