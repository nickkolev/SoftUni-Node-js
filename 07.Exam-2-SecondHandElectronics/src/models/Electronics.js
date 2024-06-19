/*
•	name – string (required)
•	type – string (required)
•	damages – string (required)
•	image - string (required)
•	description – string (required)
•	production – number (required)
•	exploitation - number (required)
•	price - number (required)
•	buyingList – an array of objects containing the users' ID
•	owner – object ID (a reference to the User model)
*/

const mongoose = require("mongoose");

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: [10, 'Name must be at least 4 characters long!'],
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minlength: [2, 'Type must be at least 4 characters long!'],
    },
    damages: {
        type: String,
        required: [true, 'Damages is required!'],
        minlength: [10, 'Damages must be at least 4 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            validator: function(v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: props => `${props.value} is not a valid URL!`
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must be at least 10 characters long!'],
        maxLength: [200, 'Description must be at most 200 characters long!'],
    },
    production: {
        type: Number,
        required: [true, 'Production is required!'],
        min: [1900, 'Production year must be at least 1900!'],
        max: [2023, 'Production year must be at most 2023!'],
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required!'],
        min: [0, 'Exploitation must be at least 0!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be at least 0!'],
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;