const Recipe = require('../models/Recipe');

exports.create = async (userId, recipeData) => {
    const createdRecipe = await Recipe.create({
        owner: userId,
        ...recipeData
    });

    return createdRecipe;
}

exports.getAll = () => Recipe.find();

exports.getOne = (recipeId) => Recipe.findById(recipeId);

exports.getOneDetailed = (recipeId) => this.getOne(recipeId).populate('owner');

exports.recommend = async (recipeId, userId) => {
    const recipe = await Recipe.findById(recipeId);

    if(recipe.recommendList.includes(userId)) {
        throw new Error('You have already recommended this recipe!');
    }

    if(recipe.owner == userId) {
        throw new Error('You cannot recommend your own recipe!');
    }

    if(!recipe) {
        throw new Error('Recipe not found!');
    }

    await Recipe.findByIdAndUpdate(recipeId, {$push: {recommendList: userId}});
};

exports.deleteOne = async (recipeId) => {

    if(!recipeId) {
        throw new Error('Recipe not found!');
    }
    
    const recipe = await Recipe.findById(recipeId);
    if(!recipe) {
        throw new Error('Recipe not found!');
    }

    await Recipe.findByIdAndDelete(recipeId);
    return recipe;
};

exports.edit = async (recipeId, recipeData) => {
    await Recipe.findByIdAndUpdate(recipeId, recipeData, {runValidators: true});
};

exports.search = (title) => {
    let query = Recipe.find(); 

    if(title) {
        query = query.find({ title: { $regex: new RegExp(title, 'i') } });
    }

    return query;
}

exports.getLatest = (count) => Recipe.find().sort({createdAt: -1}).limit(count);