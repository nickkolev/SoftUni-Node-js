const Movie = require("../models/Movie");

exports.getAll = () => {
    const movies = Movie.find();

    return movies;
};

exports.create = (movieData) => Movie.create(movieData);

// TODO: filter result in MongoDB 
exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean(); 

    if(title) {
        result = result.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
    }

    if(genre) {
        result = result.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    if(year) {
        result = result.filter(m => m.year == year);
    }

    return result;
}

exports.getOne = (movieId) => {
    const movie = Movie.findById(movieId);

    if(!movie) {
        return -1;
    }

    return movie;
}

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);

    //TODO: validate castId if exists
    //TODO: validate if cast is already added
    movie.casts.push(castId);

    return movie.save();

    // return Movie.findByIdAndUpdate(movieId, {
    //     $push: { casts: castId }
    // });
};