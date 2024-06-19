const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const electronicsService = require('../services/electronicsService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get("/search", isAuth, async (req, res) => {
    const {name, type} = req.query;

    const electronics = await electronicsService.search(name, type).lean();

    res.render("search", {electronics, name, type});
})

// TODO: this is for testing
router.get('/authorized-test', isAuth, (req, res) => {
    res.send('You are authorized!');
});

module.exports = router;