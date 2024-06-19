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
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
    },
    damages: {
        type: String,
        required: [true, 'Damages is required!'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    production: {
        type: Number,
        required: [true, 'Production is required!'],
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
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