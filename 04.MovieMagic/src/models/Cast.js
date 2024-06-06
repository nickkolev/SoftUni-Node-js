const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 10,
        max: 120
    },
    born: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
    nameInMovie: {
        type: String,
        required: true,
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\//.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const Cast = mongoose.model("Cast", castSchema);

module.exports = Cast;