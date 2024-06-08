const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

// userSchema.virtual("rePassword")
//     .set(function (value) {
//         this._rePassword = value;
//     })
//     .get(function () {
//         return this._rePassword;
//     });

// userSchema.path("rePassword").validate(function () {
//     return this.password === this._rePassword;
// }, "Passwords don't match");

const User = mongoose.model("User", userSchema);

module.exports = User;