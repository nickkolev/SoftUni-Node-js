const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (userData) =>  {
    const user = await User.create(userData);

    const token = jwt.sign({
        _id: user._id,
        email: user.email,
    }, 'SECRETKEY');

    return {
        _id: user._id,
        email: user.email,
        token: token,
    }
}