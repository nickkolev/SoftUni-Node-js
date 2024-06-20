const mongoose = require("mongoose");

const volcanoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    elevation: {
        type: Number,
        required: true,
    },
    lastEruption: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    typeVolcano: {
        type: String,
        required: true,
        enum: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
    },
    description: {
        type: String,
        required: true,
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