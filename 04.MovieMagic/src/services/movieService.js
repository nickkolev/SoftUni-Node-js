const movies = [{
    title: "Inception",
    genre: "Action, Adventure, Sci-Fi",
    director: "Christopher Nolan",
    year: 2010,
    imageUrl: "https://www.imdb.com/title/tt1375666/mediaviewer/rm10105600",
    rating: 8.8,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    _id: 1
}, {
    title: "The Matrix",
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    year: 1999,
    imageUrl: "https://www.imdb.com/title/tt0133093/mediaviewer/rm1465880832",
    rating: 8.7,
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    _id: 2
}, {
    title: "The Matrix Reloaded",
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    year: 2003,
    imageUrl: "https://www.imdb.com/title/tt0234215/mediaviewer/rm4246718720",
    rating: 7.2,
    description: "Neo and his allies fight against the machines in a post-apocalyptic world.",
    _id: 3 
}];

exports.getAll = () => {
    return movies.slice();
};

exports.create = (movieData) => {
    movieData._id = movies[movies.length - 1]._od + 1;
    movies.push(movieData);
};

exports.getOne = (movieId) => {
    const movie = movies.find(m => m._id == movieId);

    return movie;
}