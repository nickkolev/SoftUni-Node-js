const Creature = require('../models/Creature');
const User = require('../models/User');

exports.create = async (userId, creatureData) => {
    const createdCreature = await Creature.create({
        owner: userId,
        ...creatureData
    });

    await User.findByIdAndUpdate(userId, {$push: {createdCreatures: createdCreature._id}});

    return createdCreature;
}

exports.getAll = () => Creature.find();

exports.getAllDetailed = (userId) => Creature.find({ owner: userId  }).populate('owner');

exports.getOne = (creatureId) => Creature.findById(creatureId);

exports.getOneDetailed = (creatureId) => this.getOne(creatureId).populate('owner').populate('votes');

exports.vote = async (creatureId, userId) => {

    const creature = await Creature.findById(creatureId);

    if(creature.votes.includes(userId)) {
        throw new Error('You have already voted for this creature!');
    }

    if(creature.owner == userId) {
        throw new Error('You cannot vote for your own creature!');
    }

    if(!creature) {
        throw new Error('Creature not found!');
    }

    // creature.votes.push(userId);
    // user.votedCreatures.push(creatureId);

    // await creature.save();
    // await user.save();

    await Creature.findByIdAndUpdate(creatureId, {$push: {votes: userId}});
    await User.findByIdAndUpdate(userId, {$push: {votedCreatures: creatureId}});
};

exports.deleteOne = async (creatureId) => {

    const creature = await Creature.findByIdAndDelete(creatureId);
    const user = await User.findById(creature.owner);
    user.createdCreatures = user.createdCreatures.filter(c => c != creatureId);

    user.save();

    return creature;
};

exports.edit = async (creatureId, creatureData) => {
    await Creature.findByIdAndUpdate(creatureId, creatureData, {runValidators: true});
};

// exports.search = (name, type) => {
//     let query = Volcano.find(); 

//     if(name) {
//         query = query.find({ name: { $regex: new RegExp(name, 'i') } });
//     }

//     if(type) {
//         query = query.find({ typeVolcano: { $regex: new RegExp(type) } });
//     }

//     return query;
// }

// exports.getLatest = (count) => Course.find().sort({createdAt: -1}).limit(count);