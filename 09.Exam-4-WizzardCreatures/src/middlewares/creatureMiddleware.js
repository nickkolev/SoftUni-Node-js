const creatureService = require('../services/creatureService');

async function isOwner(req, res, next) {
    const creature = await creatureService.getOne(req.params.creatureId);

    if (creature.owner != req.user?._id) {
        return res.redirect(`/creatures/${req.params.creatureId}/details`);
    }

    next();
}

exports.isOwner = isOwner;