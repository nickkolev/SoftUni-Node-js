const router = require('express').Router();

const UserService = require('../services/UserService');

router.post('/register', async (req, res) => {
    const userData = req.body;

    const { _id, email, token } = UserService.register(userData);

    res.json({ _id, email, accessToken: token});
});



module.exports = router;