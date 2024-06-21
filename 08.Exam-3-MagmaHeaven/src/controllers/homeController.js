const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const volcanoService = require('../services/volcanoService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get("/search", isAuth, async (req, res) => {
    const {name, type} = req.query;

    const volcanos = await volcanoService.search(name, type).lean();

    res.render("search", {volcanos, name, type});
})

// TODO: this is for testing
router.get('/authorized-test', isAuth, (req, res) => {
    res.send('You are authorized!');
});

module.exports = router;