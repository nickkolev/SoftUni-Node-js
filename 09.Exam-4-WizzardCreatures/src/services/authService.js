const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const User = require('../models/User');
const { SECRET } = require("../config/config");

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if(user) {
        throw new Error("User already exists!");
    }

    if(userData.password !== userData.rePassword) {
        throw new Error("Passwords do not match!");
    }

    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);

    return token;
};

exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });
    
    // Check if user exists
    if(!user) {
        throw new Error("Email or password incorrect!");
    }
    
    // Check if password is correct
    let isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        throw new Error("Email or password incorrect!");
    }

    const token = await generateToken(user);

    return token;
};

async function generateToken(user) {
    // Generate jwt token
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    // Return token
    return token;
}