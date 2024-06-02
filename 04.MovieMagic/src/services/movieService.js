const movies = [{
    title: "Inception",
    genre: "Action, Adventure, Sci-Fi",
    director: "Christopher Nolan",
    year: 2010,
    imageUrl: "/img/the-little-mermaid.jpg",
    rating: 8.8,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    _id: 1
}, {
    title: "The Matrix",
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    year: 1999,
    imageUrl: "/img/home-alone.jpeg",
    rating: 8.7,
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    _id: 2
}, {
    title: "The Matrix Reloaded",
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    year: 2003,
    imageUrl: "/img/jungle-cruise.jpeg",
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

exports.search = (title, genre, year) => {
    let result = movies.slice();

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
    const movie = movies.find(m => m._id == movieId);

    if(!movie) {
        return -1;
    }

    return movie;
}