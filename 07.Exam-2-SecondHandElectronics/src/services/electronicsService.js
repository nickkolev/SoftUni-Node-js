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

// exports.getOneDetailed = (electronicsId) => this.getOne(electronicsId).populate('owner').populate('signUpList');

// exports.signUp = async (courseId, userId) => {
//     // await Course.findByIdAndUpdate(courseId, {$push: {signUpList: userId}});
//     // await User.findByIdAndUpdate(userId, {$push: {signUpCourses: courseId}});

//     const course = await Course.findById(courseId);
//     const user = await User.findById(userId);

//     course.signUpList.push(userId);
//     user.signUpCourses.push(courseId);

//     await course.save();
//     await user.save();
// };

// exports.deleteOne = async (courseId) => {

//     const course = await Course.findByIdAndDelete(courseId);

//     res.redirect('/courses');
// };

// exports.edit = async (courseId, courseData) => {
//     await Course.findByIdAndUpdate(courseId, courseData, {runValidators: true});
// };

// exports.getLatest = (count) => Course.find().sort({createdAt: -1}).limit(count);