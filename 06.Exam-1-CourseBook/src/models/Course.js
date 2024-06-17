const mongoose = require("mongoose");
const { create } = require("./User");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: [true, 'Title is required!'],
        unique: true,
    },
    type: {
        type: String,
        minLength: 3,
        required: [true, 'Type is required!'],
    },
    certificate: {
        type: String,
        minLength: 2,
        required: [true, 'Certificate is required!'],
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
        minLength: 10,
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'Price is required!'],
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

courseSchema.pre('save', function() {
    if(!this.createdAt) {
        this.createdAt = Date.now();
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;