const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const SECRET = 'asdasgjkkgjbikgfnjikvbkmfndjfkbmgfj';

exports.register = (userData) => User.create(userData);  

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

    // Generate jwt token
    const payload = {
        userId: user._id,
        email: user.email,
    };
    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    // Return token
    return token;
};