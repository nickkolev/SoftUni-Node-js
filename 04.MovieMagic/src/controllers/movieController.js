const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id
    }

    console.log(req.user);

    try {
        await movieService.create(newMovie);
        
        res.redirect('/');
    } catch(err) {
        console.log(err.message);
        res.redirect('/create');
    }

});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const isOwner = req.user?._id == movie.owner;

    if(movie == -1) {
        res.redirect('/404');
        return;
    }

    res.render('movie/details', {movie, isOwner});
});

router.get('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
});

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();

    res.render('movie/edit', { movie });
});

module.exports = router;