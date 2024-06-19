const router = require('express').Router();

const errorUtils = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const electronicsService = require('../services/electronicsService');
const { isOwner } = require('../middlewares/electronicsMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
});

router.post('/create', isAuth, async (req, res) => {
    const electronicsData = req.body;

    try {
        await electronicsService.create(req.user._id, electronicsData);
        res.redirect('/electronics');
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('electronics/create', { ...electronicsData, error: message });
    }
});

router.get('/', async (req, res) => {
    const electronics = await electronicsService.getAll().lean();

    res.render('electronics/catalog', { electronics });
});

router.get('/:electronicsId/details', async (req, res) => {
    const electronics = await electronicsService.getOneDetailed(req.params.electronicsId).lean();

    // const signedUpUsers = electronics.signUpList.map(user => user.username).join(', ');
    const isOwner = electronics.owner && electronics.owner._id == req.user?._id;
    const hasBought = electronics.buyingList.some(user => user._id == req.user?._id);

    res.render('electronics/details', { ...electronics, isOwner, hasBought });
});

router.get('/:electronicsId/buy', async (req, res) => {
    await electronicsService.buy(req.params.electronicsId, req.user._id);

    res.redirect(`/electronics/${req.params.electronicsId}/details`);
});

router.get('/:electronicsId/delete', isAuth, isOwner, async (req, res) => {
    await electronicsService.deleteOne(req.params.electronicsId);

    res.redirect('/electronics');
});

router.get('/:electronicsId/edit', isAuth, isOwner, async (req, res) => {
    const electronics = await electronicsService.getOne(req.params.electronicsId).lean();

    res.render('electronics/edit', { ...electronics });
});

router.post('/:electronicsId/edit', isAuth, isOwner, async (req, res) => {
    const electronicsData = req.body;

    try {
        await electronicsService.edit(req.params.electronicsId, electronicsData);
        res.redirect(`/electronics/${req.params.electronicsId}/details`);
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('electronics/edit', { ...electronicsData, error: message });
    }
});

module.exports = router;