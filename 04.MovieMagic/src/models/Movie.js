const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2030,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Invalid URL!'],
    },
    casts: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Cast",
        }],
        default: []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const Model = mongoose.model("Movie", movieSchema);

module.exports = Model;