const Movie = require("../model/Movie-Models.js");
const db = require('../config/db');  // Import the database connection

// Add a New Movie
module.exports.addMovie = async (req, res) => {
    try {
        const { title, director, year, genre, movie_duration, release_date, user_rating, review, watch_status } = req.body;
        // Checking for Duplicates
        const existingMovie = await Movie.getMovieByTitleAndDirector(title, director);

        if (existingMovie) {
            return res.status(400).json({
                code: "DUPLICATE-MOVIE",
                message: "Looks like we already have this movie in the system with the same title and director!"
            });
        }

        const newMovie = { title, director, year, genre, movie_duration, release_date, user_rating, review, watch_status };
        const result = await Movie.createMovie(newMovie);

        res.status(201).json({
            code: "MOVIE-ADDED",
            message: "Done! The movie is all set in our collection.",
            result: result
        });
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Oops! Something went wrong while adding the movie.",
            error: error.message
        });
    }
};

// Get All Movies
module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAllMovies();

        if (movies.length === 0) {
            return res.status(200).json({
                code: "NO-MOVIES",
                message: "Looks like we’re missing movies. Add some and check back soon!"
            });
        }
        res.status(200).json({
            code: "ALL-MOVIES-RESULT",
            message: "Here’s the full list of movies.",
            result: movies
        });
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Oops! Something went wrong while fetching the movies.",
            error: error.message
        });
    }
};

// Get a Movie by Title
module.exports.getMovieByTitle = async (req, res) => {
    try {
        const movie = await Movie.getMovieByTitle(req.params.title);
        if (movie) {
            res.status(200).json({
                code: "MOVIE-FOUND",
                message: "Here’s the movie you were looking for!",
                result: movie
            });
        } else {
            res.status(404).json({
                code: "MOVIE-NOT-FOUND",
                message: "Oops, no movie found with that title."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "There was an error fetching the movie by title.",
            error: error.message
        });
    }
};


// Get a Movie by ID
module.exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.getMovieById(req.params.id);
        if (movie) {
            res.status(200).json({
                code: "MOVIE-FOUND",
                message: "Here’s the movie you were looking for!",
                result: movie
            });
        } else {
            res.status(404).json({
                code: "MOVIE-NOT-FOUND",
                message: "Oops, no movie found with that ID."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "There was an error fetching the movie.",
            error: error.message
        });
    }
};

// Update a Movie by ID
module.exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = req.body;
        const result = await Movie.updateMovie(req.params.id, updatedMovie);
        if (result.affectedRows > 0) {
            res.status(200).json({
                code: "MOVIE-UPDATED",
                message: "All set! The movie has been updated."
            });
        } else {
            res.status(404).json({
                code: "MOVIE-NOT-FOUND",
                message: "Oops, no movie found with that ID."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Oops! Something went wrong while updating the movie.",
            error: error.message
        });
    }
};

// Delete a Movie by ID
module.exports.deleteMovie = async (req, res) => {
    try {
        const result = await Movie.deleteMovie(req.params.id);
        if (result.affectedRows > 0) {
            res.status(200).json({
                code: "MOVIE-DELETED",
                message: "Done! The movie is no longer in the list."
            });
        } else {
            res.status(404).json({
                code: "MOVIE-NOT-FOUND",
                message: "Oops, no movie found with that ID."
            });
        }
    } catch (error) {
        res.status(500).json({
            code: "SERVER-ERROR",
            message: "Oops! Something went wrong while deleting the movie.",
            error: error.message
        });
    }
};