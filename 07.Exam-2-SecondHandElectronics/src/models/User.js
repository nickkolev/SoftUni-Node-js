const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: 4,
    },
    createdElectronics: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronics',
    }],
    boughtElectronic: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronics',
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