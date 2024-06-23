/*
•	title - string (required),
•	ingredients- string (required),
•	instructions- string (required),
•	description - string (required),
•	image: string (required),
•	recommendList - a collection of Users (a reference to the User model)
•	owner - object ID (a reference to the User model)
*/
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title must be at least 2 characters long!'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required!'],
        minLength: [10, 'Ingredients must be at least 10 characters long!'],
        maxLength: [200, 'Ingredients must be less than 200 characters long!'],
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required!'],
        minLength: [10, 'Ingredients must be at least 10 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Ingredients must be at least 10 characters long!'],
        maxLength: [200, 'Ingredients must be less than 200 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (v) => {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: (props) => {
                return `${props.value} is not a valid image URL!`;
            }
        }
    },
    createdAt: {
        type: Date,
    },
    recommendList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

recipeSchema.pre('save', function() {
    if(!this.createdAt) {
        this.createdAt = Date.now();
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;