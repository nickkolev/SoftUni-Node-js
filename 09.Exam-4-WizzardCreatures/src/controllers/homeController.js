const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const userService = require('../services/userService');
const creatureService = require('../services/creatureService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getInfo(req.user._id);
    const creatures = await creatureService.getAllDetailed(req.user._id).lean();

    console.log(creatures);

    res.render('my-posts', { creatures, user });
});

// TODO: this is for testing
router.get('/authorized-test', isAuth, (req, res) => {
    res.send('You are authorized!');
});

module.exports = router;