const router = require('express').Router();

const errorUtils = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const creatureService = require('../services/creatureService');
const { isOwner } = require('../middlewares/creatureMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('creatures/create');
});

router.post('/create', isAuth, async (req, res) => {
    const creatureData = req.body;

    try {
        await creatureService.create(req.user._id, creatureData);
        res.redirect('/creatures');
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('creatures/create', { ...creatureData, error: message });
    }
});

router.get('/', async (req, res) => {
    const creatures = await creatureService.getAll().lean();

    res.render('creatures/all-posts', { creatures });
});

router.get('/:creatureId/details', async (req, res) => {

    try {
        const creature = await creatureService.getOneDetailed(req.params.creatureId).lean();

        const isOwner = creature.owner && creature.owner._id == req.user?._id;
        const hasVoted = creature.votes.some(user => user._id == req.user?._id);
        const votersEmails = creature.votes.map(vote => vote.email).join(', ');
        res.render('creatures/details', { ...creature, isOwner, hasVoted, votersEmails });
    } catch (err) {
        return res.render('home', { error: 'Creature not found!' });
    }
});

router.get('/:creatureId/vote', async (req, res) => {

    try {
        await creatureService.vote(req.params.creatureId, req.user._id);
        res.redirect(`/creatures/${req.params.creatureId}/details`);
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        return res.render('home', { error: message });
    }

});

router.get('/:creatureId/delete', isAuth, isOwner, async (req, res) => {
    await creatureService.deleteOne(req.params.creatureId);

    res.redirect('/creatures');
});

router.get('/:creatureId/edit', isAuth, isOwner, async (req, res) => {
    const creature = await creatureService.getOne(req.params.creatureId).lean();

    res.render('creatures/edit', { ...creature });
});

router.post('/:creatureId/edit', isAuth, isOwner, async (req, res) => {
    const creatureData = req.body;

    try {
        await creatureService.edit(req.params.creatureId, creatureData);
        res.redirect(`/creatures/${req.params.creatureId}/details`);
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('creatures/edit', { ...creatureData, error: message });
    }
});

module.exports = router;