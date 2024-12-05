const db = require("../config/db.js");

// Add a New Movie
module.exports.createMovie = async (movieData) => {
    const { title, director, year, genre, movie_duration, release_date } = movieData;
    const query = `
        INSERT INTO movies (title, director, year, genre, movie_duration, release_date)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
        title,
        director,
        year,
        genre,
        movie_duration,
        release_date
    ]);
    return result;
};


// Checking for Duplicates
module.exports.getMovieByTitleAndDirector = async (title, director) => {
    const [rows] = await db.execute("SELECT * FROM movies WHERE title = ? AND director = ?", [title, director]);
    return rows[0];
};

// Get All Movies
module.exports.getAllMovies = async () => {
    const [rows] = await db.execute("SELECT * FROM movies");
    return rows;
};

// Get a Movie by Title
module.exports.getMovieByTitle = async (title) => {
    const [rows] = await db.execute("SELECT * FROM movies WHERE title = ?", [title]);
    return rows[0];
};


// Get a Movie by ID
module.exports.getMovieById = async (id) => {
    const [rows] = await db.execute("SELECT * FROM movies WHERE id = ?", [id]);
    return rows[0];
};

// Update a Movie by ID
module.exports.updateMovie = async (id, movieData) => {
    const { title, director, year, genre, movie_duration, release_date } = movieData;
    const query = `
        UPDATE movies
        SET title = ?, director = ?, year = ?, genre = ?, movie_duration = ?, release_date = ?
        WHERE id = ?`;

    const [result] = await db.execute(query, [
        title,
        director,
        year,
        genre,
        movie_duration,
        release_date,
        id
    ]);
    return result;
};

// Delete a Movie by ID
module.exports.deleteMovie = async (id) => {
    const [result] = await db.execute("DELETE FROM movies WHERE id = ?", [id]);
    return result;
};
