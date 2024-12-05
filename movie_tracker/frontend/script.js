const API_URL = "http://localhost:3000/movies";

// Add a Movie
document.getElementById("add-movie-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const movieData = {
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        year: document.getElementById("year").value,
        genre: document.getElementById("genre").value,
        movie_duration: document.getElementById("movie_duration").value,
        release_date: document.getElementById("release_date").value,
    };

    try {
        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movieData),
        });

        if (response.ok) {
            alert("Movie added successfully!");
        } else {
            const error = await response.json();
            alert(`Error adding movie: ${error.message}`);
        }
    } catch (error) {
        alert(`Error adding movie: ${error.message}`);
    }
});



// Get All Movies
document.getElementById("get-all-movies").addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        const data = await response.json();

        if (data.result && data.result.length > 0) {
            const moviesList = document.getElementById("movies-list");
            moviesList.innerHTML = data.result
                .map(
                    (movie) => `
                    <div class="col-lg-4 col-md-6">
                        <div class="card mt-2" id="movie-${movie.id}">
                            <div class="card-body">
                                <h5>${movie.title}</h5>
                                <p><strong>ID:</strong> ${movie.id}</p>
                                <p><strong>Director:</strong> ${movie.director}</p>
                                <p><strong>Year:</strong> ${movie.year}</p>
                                <p><strong>Genre:</strong> ${movie.genre}</p>
                                <p><strong>Duration:</strong> ${movie.movie_duration} minutes</p>
                                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                                <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">Delete Movie</button>
                            </div>
                        </div>
                    </div>
                `
                )
                .join("");
        } else {
            alert(data.message || "No movies found.");
        }
    } catch (error) {
        alert(`Error fetching movies: ${error.message}`);
    }
});


// Get a Movie by Title
document
    .getElementById("get-movie-by-title-form")
    .addEventListener("submit", async (event) => {
        event.preventDefault(); 
        const movieTitle = document.getElementById("movie-title-input").value;

        try {
            const response = await fetch(`${API_URL}/title/${movieTitle}`);
            const data = await response.json();

            if (data.result) {
                const movieDetailsTitle = document.getElementById("movie-details-title");
                movieDetailsTitle.innerHTML = `
                    <div class="card mt-2">
                        <div class="card-body">
                            <h5>${data.result.title}</h5>
                            <p><strong>ID:</strong> ${data.result.id}</p>
                            <p><strong>Director:</strong> ${data.result.director}</p>
                            <p><strong>Year:</strong> ${data.result.year}</p>
                            <p><strong>Genre:</strong> ${data.result.genre}</p>
                            <p><strong>Duration:</strong> ${data.result.movie_duration} minutes</p>
                            <p><strong>Release Date:</strong> ${data.result.release_date}</p>
                        </div>
                    </div>
                `;
            } else {
                alert(data.message || "Movie not found.");
            }
        } catch (error) {
            alert(`Error fetching movie: ${error.message}`);
        }
    });



// Get a Movie by ID
document.getElementById("get-movie-by-id-form").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const movieId = document.getElementById("movie-id-input").value;

    try {
        const response = await fetch(`${API_URL}/${movieId}`);
        const data = await response.json();

        if (data.result) {
            const movieDetails = document.getElementById("movie-details");
            movieDetails.innerHTML = `
                <div class="card mt-2">
                    <div class="card-body">
                        <h5>${data.result.title}</h5>
                        <p><strong>ID:</strong> ${data.result.id}</p>
                        <p><strong>Director:</strong> ${data.result.director}</p>
                        <p><strong>Year:</strong> ${data.result.year}</p>
                        <p><strong>Genre:</strong> ${data.result.genre}</p>
                        <p><strong>Duration:</strong> ${data.result.movie_duration} minutes</p>
                        <p><strong>Release Date:</strong> ${data.result.release_date}</p>
                    </div>
                </div>
            `;
        } else {
            alert(data.message || "Movie not found.");
        }
    } catch (error) {
        alert(`Error fetching movie: ${error.message}`);
    }
});


// Update a Movie
document.getElementById("update-movie-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const movieId = document.getElementById("update-id").value;
    const updatedData = {
        title: document.getElementById("update-title").value,
        director: document.getElementById("update-director").value,
        year: document.getElementById("update-year").value,
        genre: document.getElementById("update-genre").value,
        movie_duration: document.getElementById("update-duration").value,
        release_date: document.getElementById("update-release").value,
    };

    try {
        const response = await fetch(`${API_URL}/update/${movieId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert("Movie updated successfully!");
        } else {
            const error = await response.json();
            alert(`Error updating movie: ${error.message}`);
        }
    } catch (error) {
        alert(`Error updating movie: ${error.message}`);
    }
});

// Delete Movie
async function deleteMovie(movieId) {
    const confirmation = confirm("Are you sure you want to delete this movie?");
    if (!confirmation) return;

    try {
        const response = await fetch(`${API_URL}/delete/${movieId}`, {
            method: "DELETE",
        });

        if (response.ok) {
           
            const movieCard = document.getElementById(`movie-${movieId}`);
            if (movieCard) {
                movieCard.remove();
            }
            alert("Movie deleted successfully!");
        } else {
            const error = await response.json();
            alert(`Error deleting movie: ${error.message}`);
        }
    } catch (error) {
        alert(`Error deleting movie: ${error.message}`);
    }
}


