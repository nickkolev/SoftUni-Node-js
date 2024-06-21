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

    if(volcano.voteList.includes(userId) || user.votedVolcanos.includes(volcanoId)) {
        throw new Error('You have already voted for this volcano!');
    }

    if(volcano.owner == userId) {
        throw new Error('You cannot vote for your own volcano!');
    }

    if(!volcano) {
        throw new Error('Volcano not found!');
    }

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

exports.search = (name, type) => {
    let query = Volcano.find(); 

    if(name) {
        query = query.find({ name: { $regex: new RegExp(name, 'i') } });
    }

    if(type) {
        query = query.find({ typeVolcano: { $regex: new RegExp(type) } });
    }

    return query;
}

// exports.getLatest = (count) => Course.find().sort({createdAt: -1}).limit(count);