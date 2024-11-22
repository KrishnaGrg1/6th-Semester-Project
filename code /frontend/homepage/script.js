let form = document.querySelector('form');
let movieContainer = document.querySelector('.movie-container');
let inputBox = document.querySelector('input[type="text"]');
let currentPage = 1;
let currentMovieName = "";
let moviesPerPage = 3;

// Fetch movie information from the API with pagination
const getMovieInfo = async (movieName, page = 1) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=7390c31e7d4f58c4b9afbc61a12f010e&query=${movieName}&page=${page}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
};

// Fetch YouTube trailer for a movie
const getMovieTrailer = async (movieId) => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7390c31e7d4f58c4b9afbc61a12f010e`;
    let response = await fetch(url);
    let data = await response.json();
    let trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

const showMovies = async (data, movieName) => {
    if (data.results.length === 0) {
        // Display "No more videos found" if no results are returned
        movieContainer.innerHTML = `<p>${movieName} not available</p>`;
        return;
    }

    const movies = data.results.slice(0, moviesPerPage * currentPage);

    // Clear previous content if it's a new search (page 1)
    if (currentPage === 1) {
        movieContainer.innerHTML = '';
    }

    for (const movie of movies) {
        const { id, title, vote_average, genre_ids, release_date, runtime, overview, poster_path } = movie;
        const genres = genre_ids.join(', ');
        const trailerUrl = await getMovieTrailer(id);
        const videoId = trailerUrl ? trailerUrl.split('v=')[1] : null;

        const movieDetail = document.createElement('div');
        movieDetail.classList.add('movie-details');
        movieDetail.innerHTML = `
            <div class="movie-poster">
                <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </div>
            <div class="movie-info">
                <h2>${title}</h2>
                <p><span class="rating">&#11088; ${vote_average}</span></p>
                <p><strong>Genres:</strong> ${genres}</p>
                <p><strong>Released:</strong> ${release_date}</p>
                <p><strong>Runtime:</strong> ${runtime ? runtime + ' min' : 'N/A'}</p>
                <p><strong>Overview:</strong> ${overview}</p>
                ${videoId ? `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="1"></iframe>` : ''}
            </div>
        `;
        movieContainer.appendChild(movieDetail);
    }

    // Only create the "Get More" button if there are more movies to show
    if (data.results.length > moviesPerPage * currentPage) {
        let getMoreButton = document.getElementById('get-more-button');

        // Create the button if it doesn't exist
        if (!getMoreButton) {
            getMoreButton = document.createElement('button');
            getMoreButton.id = 'get-more-button';
            getMoreButton.textContent = 'Get More';
            movieContainer.appendChild(getMoreButton);

            getMoreButton.addEventListener('click', async () => {
                // Increment current page and fetch more movies
                currentPage++;
                getMoreButton.remove(); // Remove the button before fetching more
                const newData = await getMovieInfo(movieName, currentPage);
                showMovies(newData, movieName);
            });
        }
    }
};

// Add event listener to the form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName) {
        currentMovieName = movieName;
        currentPage = 1;
        movieContainer.innerHTML = '';
        const data = await getMovieInfo(movieName);
        showMovies(data, movieName);
        inputBox.value = '';
    }
});

// Dark mode toggle functionality
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;
let cur = "light";
const icon = document.querySelector('#icon');

toggleButton.addEventListener("click", () => {
    if (cur === "light") {
        body.classList.add('dark-mode');
        cur = "dark";
        icon.src = "../photo/sun.png";
    } else {
        body.classList.remove('dark-mode');
        cur = "light";
        icon.src = "../photo/moon.png";
    }
});
