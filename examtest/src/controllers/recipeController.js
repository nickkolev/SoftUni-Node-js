const router = require('express').Router();

const errorUtils = require('../utils/errorUtils');

const { isAuth } = require('../middlewares/authMiddleware');
const { isOwner } = require('../middlewares/recipeMiddleware');

const recipeService = require('../services/recipeService');

router.get('/create', isAuth, (req, res) => {
    res.render('recipes/create');
});

router.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body;

    try {
        await recipeService.create(req.user._id, recipeData);
        res.redirect('/recipes');
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('recipes/create', { ...recipeData, error: message });
    }
});

router.get('/', async (req, res) => {
    const recipes = await recipeService.getAll().lean();

    res.render('recipes/catalog', { recipes });
});

router.get('/:recipeId/details', async (req, res) => {

    try {
        const recipe = await recipeService.getOneDetailed(req.params.recipeId).lean();

        const isOwner = recipe.owner && recipe.owner._id == req.user?._id;
        const hasRecommended = recipe.recommendList.some(user => user._id == req.user?._id);

        res.render('recipes/details', { ...recipe, isOwner, hasRecommended });
    } catch (err) {
        return res.render('home', { error: 'Recipe not found!' });
    }
});

router.get('/:recipeId/recommend', async (req, res) => {

    try {
        await recipeService.recommend(req.params.recipeId, req.user._id);
        res.redirect(`/recipes/${req.params.recipeId}/details`);
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        return res.render('home', { error: message });
    }

});

router.get('/:recipeId/delete', isAuth, isOwner, async (req, res) => {

    try {
        await recipeService.deleteOne(req.params.recipeId);
    } catch (err) {
        return res.render('home', { error: 'Recipe not found!' });
    }

    res.redirect('/recipes');
});

router.get('/:recipeId/edit', isAuth, isOwner, async (req, res) => {
    const recipe = await recipeService.getOne(req.params.recipeId).lean();

    res.render('recipes/edit', { ...recipe });
});

router.post('/:recipeId/edit', isAuth, isOwner, async (req, res) => {
    const recipeData = req.body;

    try {
        await recipeService.edit(req.params.recipeId, recipeData);
        res.redirect(`/recipes/${req.params.recipeId}/details`);
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('recipes/edit', { ...recipeData, error: message });
    }
});

module.exports = router;