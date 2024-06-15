const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        unique: true,
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
    },
    certificate: {
        type: String,
        required: [true, 'Certificate is required!'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            validator: function(v) {
                return v.startsWith('http') || v.startsWith('https');
            },
            message: props => `${props.value} is not a valid URL!`
        },
    },
    description: {
        type: Boolean,
        required: [true, 'Description is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;