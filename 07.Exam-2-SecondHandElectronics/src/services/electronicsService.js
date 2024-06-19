const Electronics = require('../models/Electronics');
const User = require('../models/User');

exports.create = async (userId, electronicsData) => {
    const createdElectronics = await Electronics.create({
        owner: userId,
        ...electronicsData
    });

    // await User.findByIdAndUpdate(userId, {$push: {createdCourses: createdCourse._id}});

    return createdElectronics;
}

exports.getAll = () => Electronics.find();

exports.getOne = (electronicsId) => Electronics.findById(electronicsId);

exports.getOneDetailed = (electronicsId) => this.getOne(electronicsId).populate('owner'); //.populate('buyingList')

exports.buy = async (electronicsId, userId) => {
    // await Course.findByIdAndUpdate(courseId, {$push: {signUpList: userId}});
    // await User.findByIdAndUpdate(userId, {$push: {signUpCourses: courseId}});

    const electronics = await Electronics.findById(electronicsId);
    const user = await User.findById(userId);

    electronics.buyingList.push(userId);
    user.boughtElectronic.push(electronicsId);

    await electronics.save();
    await user.save();
};

exports.deleteOne = async (electronicsId) => {

    const electronics = await Electronics.findByIdAndDelete(electronicsId);

    return electronics;
};

exports.edit = async (electronicsId, electronicsData) => {
    await Electronics.findByIdAndUpdate(electronicsId, electronicsData, {runValidators: true});
};

exports.search = (name, type) => {
    let query = Electronics.find(); 

    if(name) {
        query = query.find({ name: { $regex: new RegExp(name, 'i') } });
    }

    if(type) {
        query = query.find({ type: { $regex: new RegExp(type, 'i') } });
    }

    return query;
}


// exports.getLatest = (count) => Course.find().sort({createdAt: -1}).limit(count);