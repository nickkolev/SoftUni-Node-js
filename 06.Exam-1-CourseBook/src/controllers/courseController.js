const router = require('express').Router();

const errorUtils = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');

router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.create(req.user._id, courseData);
        res.redirect('/courses');
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('courses/create', { ...courseData, error: message });
    }
});

router.get('/', isAuth, async (req, res) => {
    const courses = await courseService.getAll().lean();

    res.render('courses/catalog', { courses });
});

router.get('/:courseId/details', isAuth, async (req, res) => {
    const course = await courseService.getOneDetailed(req.params.courseId).lean();

    const signedUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isOwner = course.owner && course.owner._id == req.user?._id;
    const isSigned = course.signUpList.some(user => user._id == req.user?._id);

    res.render('courses/details', { ...course, signedUpUsers, isOwner, isSigned });
});

router.get('/:courseId/sign-up', async (req, res) => {
    await courseService.signUp(req.params.courseId, req.user._id);

    res.redirect(`/courses/${req.params.courseId}/details`);
});

router.get('/:courseId/delete', isAuth, isOwner, async (req, res) => {
    await courseService.deleteOne(req.params.courseId);

    res.redirect('/courses');
});

async function isOwner(req, res, next) {
    const course = await courseService.getOne(req.params.courseId);

    if (course.owner != req.user?._id) {
        return res.redirect(`/courses/${req.params.courseId}/details`);
    }

    next();
}

module.exports = router;