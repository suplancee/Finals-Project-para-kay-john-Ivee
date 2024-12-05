const express = require("express");

//Express routing components
const router = express.Router();
const movieController = require("../controller/Movie-Controllers.js");

// Add a New Movie
router.post("/add", movieController.addMovie);

// Get All Movies
router.get("/all", movieController.getAllMovies);

// Get a Movie by Title
router.get("/title/:title", movieController.getMovieByTitle);

// Get a Movie by ID
router.get("/:id", movieController.getMovieById);

// Update a Movie by ID
router.put("/update/:id", movieController.updateMovie);

// Delete a Movie by ID
router.delete("/delete/:id", movieController.deleteMovie);

module.exports = router;
