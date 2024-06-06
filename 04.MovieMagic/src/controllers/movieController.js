const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);
        
        res.redirect('/');
    } catch(err) {
        console.log(err.message);
        res.redirect('/create');
    }

});

router.get('/details/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    if(movie == -1) {
        res.redirect('/404');
        return;
    }

    res.render('details', {movie});
});

module.exports = router;