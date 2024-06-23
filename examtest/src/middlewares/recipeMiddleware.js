const recipeService = require('../services/recipeService');

async function isOwner(req, res, next) {
    const recipe = await recipeService.getOne(req.params.recipeId);

    if (recipe.owner != req.user?._id) {
        return res.redirect(`/recipes/${req.params.recipeId}/details`);
    }

    next();
}

exports.isOwner = isOwner;