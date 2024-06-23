const router = require('express').Router();
const recipeService = require('../services/recipeService');

router.get('/', async (req, res) => {
    const latestRecipes = await recipeService.getLatest(3).lean();
    
    res.render('home', { latestRecipes });
});

router.get("/search", async (req, res) => {
    const {title} = req.query;

    const recipes = await recipeService.search(title).lean();

    res.render("search", { recipes });
})

module.exports = router;