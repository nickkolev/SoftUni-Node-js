const mongoose = require("mongoose");

const volcanoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at least 2 characters!']
    },
    location: {
        type: String,
        required: true,
        minLength: [3, 'Location should be at least 3 characters!']
    },
    elevation: {
        type: Number,
        required: true,
        min: [0, 'Elevation should be positive number!']
    },
    lastEruption: {
        type: Number,
        required: true,
        min: [0, 'Last eruption should be positive number!'],
        max: [2024, 'Last eruption should be before 2024!']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: (props) => {
                return `${props.value} is not a valid image URL!`;
            }
        }
    },
    typeVolcano: {
        type: String,
        required: true,
        enum: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters!']
    },
    voteList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Volcano = mongoose.model("Volcano", volcanoSchema);

module.exports = Volcano;