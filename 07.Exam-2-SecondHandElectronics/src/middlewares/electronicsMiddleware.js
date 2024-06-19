const electronicsService = require('../services/electronicsService');

async function isOwner(req, res, next) {
    const electronics = await electronicsService.getOne(req.params.electronicsId);

    if (electronics.owner != req.user?._id) {
        return res.redirect(`/electronics/${req.params.electronicsId}/details`);
    }

    next();
}

exports.isOwner = isOwner;