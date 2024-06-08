const Movie = require("../models/Movie");

exports.getAll = () => {
    const movies = Movie.find();

    return movies;
};

exports.create = (movieData) => Movie.create(movieData);

// TODO: filter result in MongoDB 
exports.search = (title, genre, year) => {
    let query = Movie.find(); 

    if(title) {
        query = query.find({ title: { $regex: new RegExp(title, 'i') } });
    }

    if(genre) {
        query = query.find({ genre: { $regex: new RegExp(genre, 'i') } });
    }

    if(year) {
        query = query.find({ year });
    }

    return query;
}

exports.getOne = (movieId) => {
    const movie = Movie.findById(movieId).populate('casts');

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