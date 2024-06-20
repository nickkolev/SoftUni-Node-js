const Volcano = require('../models/Volcano');
const User = require('../models/User');

exports.create = async (userId, volcanoData) => {
    const createdVolcano = await Volcano.create({
        owner: userId,
        ...volcanoData
    });

    await User.findByIdAndUpdate(userId, {$push: {createdVolcanos: createdVolcano._id}});

    return createdVolcano;
}

exports.getAll = () => Volcano.find();

exports.getOne = (volcanoId) => Volcano.findById(volcanoId);

exports.getOneDetailed = (volcanoId) => this.getOne(volcanoId).populate('owner'); //.populate('voteList');

exports.vote = async (volcanoId, userId) => {
    // await Course.findByIdAndUpdate(courseId, {$push: {signUpList: userId}});
    // await User.findByIdAndUpdate(userId, {$push: {signUpCourses: courseId}});

    const volcano = await Volcano.findById(volcanoId);
    const user = await User.findById(userId);

    volcano.voteList.push(userId);
    user.votedVolcanos.push(volcanoId);

    await volcano.save();
    await user.save();
};

exports.deleteOne = async (volcanoId) => {

    const volcano = await Volcano.findByIdAndDelete(volcanoId);

    return volcano;
};

exports.edit = async (volcanoId, volcanoData) => {
    await Volcano.findByIdAndUpdate(volcanoId, volcanoData, {runValidators: true});
};

// exports.getLatest = (count) => Course.find().sort({createdAt: -1}).limit(count);