const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [2, 'Username must be at least 2 characters long!'],
        maxlength: [20, 'Username must be less than 20 characters long!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minlength: [10, 'Email must be at least 10 characters long!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [4, 'Password must be at least 4 characters long!'],
    },
    createdRecipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
    }],
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;