/*
•	name – string (required)
•	species – string (required)
•	skinColor – string (required)
•	eyeColor – string (required)
•	image - string (required)
•	description – string (required)
•	votes – an array of objects containing the users' ID
•	owner – object ID (a reference to the User model)
*/

const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    species: {
        type: String,
        required: [true, 'Species is required!'],
    },
    skinColor: {
        type: String,
        required: [true, 'Skin color is required!'],
    },
    eyeColor: {
        type: String,
        required: [true, 'Eye color is required!'],
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
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;