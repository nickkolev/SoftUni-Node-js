const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

