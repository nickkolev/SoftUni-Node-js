const Course = require('../models/Course');
const User = require('../models/User');

exports.create = async (userId, courseData) => {
    const createdCourse = await Course.create({
        owner: userId,
        ...courseData
    });

    await User.findByIdAndUpdate(userId, {$push: {createdCourses: createdCourse._id}});

    return createdCourse;
}

exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);

exports.getOneDetailed = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.signUp = async (courseId, userId) => {
    // await Course.findByIdAndUpdate(courseId, {$push: {signUpList: userId}});
    // await User.findByIdAndUpdate(userId, {$push: {signUpCourses: courseId}});

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    course.signUpList.push(userId);
    user.signUpCourses.push(courseId);

    await course.save();
    await user.save();
};

exports.deleteOne = async (courseId) => {

    const course = await Course.findByIdAndDelete(courseId);

    return course;
};

exports.edit = async (courseId, courseData) => {
    await Course.findByIdAndUpdate(courseId, courseData, {runValidators: true});
};

exports.getLatest = (count) => Course.find().sort({createdAt: -1}).limit(count);