const router = require('express').Router();

const errorUtils = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const electronicsService = require('../services/electronicsService');
// const { isOwner } = require('../middlewares/courseMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
});

router.post('/create', isAuth, async (req, res) => {
    const electronicsData = req.body;

    try {
        await electronicsService.create(req.user._id, electronicsData);
        res.redirect('/electronics');
    } catch (err) {
        const message = errorUtils.getErrorMessage(err);
        res.render('electronics/create', { ...electronicsData, error: message });
    }
});

router.get('/', async (req, res) => {
    const electronics = await electronicsService.getAll().lean();

    res.render('electronics/catalog', { electronics });
});

// router.get('/:courseId/details', async (req, res) => {
//     const course = await courseService.getOneDetailed(req.params.courseId).lean();

//     const signedUpUsers = course.signUpList.map(user => user.username).join(', ');
//     const isOwner = course.owner && course.owner._id == req.user?._id;
//     const isSigned = course.signUpList.some(user => user._id == req.user?._id);

//     res.render('courses/details', { ...course, signedUpUsers, isOwner, isSigned });
// });

// router.get('/:courseId/sign-up', async (req, res) => {
//     await courseService.signUp(req.params.courseId, req.user._id);

//     res.redirect(`/courses/${req.params.courseId}/details`);
// });

// router.get('/:courseId/delete', isAuth, isOwner, async (req, res) => {
//     await courseService.deleteOne(req.params.courseId);

//     res.redirect('/courses');
// });

// router.get('/:courseId/edit', isAuth, isOwner, async (req, res) => {
//     const course = await courseService.getOne(req.params.courseId).lean();

//     res.render('courses/edit', { ...course });
// });

// router.post('/:courseId/edit', isAuth, isOwner, async (req, res) => {
//     const courseData = req.body;

//     try {
//         await courseService.edit(req.params.courseId, courseData);
//         res.redirect(`/courses/${req.params.courseId}/details`);
//     } catch (err) {
//         const message = errorUtils.getErrorMessage(err);
//         res.render('courses/edit', { ...courseData, error: message });
//     }
// });

module.exports = router;