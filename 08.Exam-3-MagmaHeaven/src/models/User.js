const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [2, 'Username should be at least 2 characters!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minlength: [10, 'Email should be at least 10 characters!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [4, 'Password should be at least 4 characters!'],
    },
    createdVolcanos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Volcano',
    }],
    votedVolcanos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Volcano',
    }],
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

// This can be done in the service
// userSchema.virtual("rePassword")
//     .set(function (value) {
//         if (this.password !== value) {
//             throw new Error("Passwords don't match");
//         }
//     });

const User = mongoose.model("User", userSchema);

module.exports = User;