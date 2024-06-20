const router = require('express').Router();

const errorUtils = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const volcanoService = require('../services/volcanoService');
const { isOwner } = require('../middlewares/volcanoMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('volcanos/create');
});

router.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;

    try {
        await volcanoService.create(req.user._id, volcanoData);
        res.redirect('/volcanos');
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('volcanos/create', { ...volcanoData, error: message });
    }
});

router.get('/', async (req, res) => {
    const volcanos = await volcanoService.getAll().lean();

    res.render('volcanos/catalog', { volcanos });
});

router.get('/:volcanoId/details', async (req, res) => {
    const volcano = await volcanoService.getOneDetailed(req.params.volcanoId).lean();

    // const signedUpUsers = volcano.signUpList.map(user => user.username).join(', ');
    const isOwner = volcano.owner && volcano.owner._id == req.user?._id;
    const hasVoted = volcano.voteList.some(user => user._id == req.user?._id);

    res.render('volcanos/details', { ...volcano, isOwner, hasVoted });
});

router.get('/:volcanoId/vote', async (req, res) => {
    await volcanoService.vote(req.params.volcanoId, req.user._id);

    res.redirect(`/volcanos/${req.params.volcanoId}/details`);
});

router.get('/:volcanoId/delete', isAuth, isOwner, async (req, res) => {
    await volcanoService.deleteOne(req.params.volcanoId);

    res.redirect('/volcanos');
});

router.get('/:volcanoId/edit', isAuth, isOwner, async (req, res) => {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();

    res.render('volcanos/edit', { ...volcano });
});

router.post('/:volcanoId/edit', isAuth, isOwner, async (req, res) => {
    const volcanoData = req.body;

    try {
        await volcanoService.edit(req.params.volcanoId, volcanoData);
        res.redirect(`/volcanos/${req.params.volcanoId}/details`);
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('volcanos/edit', { ...volcanoData, error: message });
    }
});

module.exports = router;