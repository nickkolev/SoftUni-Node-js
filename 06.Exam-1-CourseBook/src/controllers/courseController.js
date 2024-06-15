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
    // const courses = await courseService.getAll(req.user._id);

    res.render('courses/catalog', { });
});

module.exports = router;