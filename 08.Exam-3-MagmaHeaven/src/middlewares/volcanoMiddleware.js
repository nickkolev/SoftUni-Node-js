const volcanoService = require('../services/volcanoService');

async function isOwner(req, res, next) {
    const volcano = await volcanoService.getOne(req.params.volcanoId);

    if (volcano.owner != req.user?._id) {
        return res.redirect(`/volcanos/${req.params.volcanoId}/details`);
    }

    next();
}

exports.isOwner = isOwner;