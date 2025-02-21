document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const movieContainer = document.querySelector('.movie-container');
    const inputBox = document.getElementById('searchInput');
    const searchButton = document.getElementById('search-movie');
    const main = document.querySelector('main');
    const contactSection = document.getElementById('contact');
    const searchResults=document.getElementById('searchResults')
  
    let currentPage = 1;
    let currentMovieName = '';
    const moviesPerPage = 3;
    const API_KEY = '576de2fd895bd4c93d0593bdd3e50ec9';
  
    // Fetch movie data from the API
    const getMovieInfo = async (movieName, page = 1) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie info:', error);
            alert('Failed to fetch movie data. Please try again.');
        }
    };
  
    // Fetch movie trailers
    const getMovieTrailer = async (movieId) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
            );
            const data = await response.json();
            const trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
            return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
        } catch (error) {
            console.error('Error fetching trailer:', error);
            return null;
        }
    };
  
    // Display movies
   // Display movies
  const showMovies = async (data, movieName) => {
    if (!data.results || data.results.length === 0) {
        movieContainer.innerHTML += `<p style="color: red;"><strong>No more results found for "${movieName}".</strong></p>`;
        return;
    }
  
    if (currentPage === 1) {
        movieContainer.innerHTML = ''; // Clear previous content
    }
  
    const movies = data.results.slice(0, moviesPerPage * currentPage);
    for (const movie of movies) {
        const { id, title, vote_average, genre_ids, release_date, overview, poster_path } = movie;
  
        // Only proceed if the movie has a poster and trailer
        if (poster_path) {
            const trailerUrl = await getMovieTrailer(id);
            if (trailerUrl) {
                // Only show the movie if both poster and trailer are available
                const movieDetail = document.createElement('div');
                movieDetail.classList.add('movie-details');
                movieDetail.innerHTML = `
                    <div class="poster-container">
                        <img id="movie-poster-${id}" 
                        src="https://image.tmdb.org/t/p/w500${poster_path}" 
                        alt="${title}" 
                        class="movie-poster">
                    </div>
                    <div class="movie-info">
                        <div class="title-section">
                            <h1>${title}</h1>
                            <p class="director">Released: ${release_date}</p>
                        </div>
                        <button class="play-trailer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                            </svg>Play Trailer
                        </button>
                        <div class="rating">
                            <span class="star">★</span>
                            <span>${vote_average}</span>
                        </div>
                        <div class="metadata-grid">
                            <div class="metadata-item">
                            <h4>Overview</h4>
                            <p>${overview}</p>
                        </div>
                        <div class="metadata-item">
                            <h4>Genres</h4>
                            <p>${genre_ids.join(', ')}</p>
                        </div>
                    </div>
                  
                   
                `;
                movieContainer.appendChild(movieDetail);
  
                // Add event listener to redirect to details page
                movieDetail.addEventListener('click', () => {
                    window.location.href = `/movie/${id}`;
                });
            }
        }
    }
  
    // Handle "Get More" button
    if (data.results.length > moviesPerPage * currentPage) {
        let getMoreButton = document.getElementById('get-more-button');
        
  
        if (!getMoreButton) {
            getMoreButton = document.createElement('button');
            getMoreButton.id = 'get-more-button';
            getMoreButton.textContent = 'Get More';
            movieContainer.appendChild(getMoreButton);
  
            getMoreButton.addEventListener('click', async () => {
                currentPage++;
                getMoreButton.remove();
                const newData = await getMovieInfo(movieName, currentPage);
                showMovies(newData, movieName);
                   
            });
        }
    }
  };
  
  
    // Event Listener for Search Button
    searchButton.addEventListener('click', async () => {
        // e.preventDefault();
        const movieName = inputBox.value.trim();
      
  
        if (movieName) {
            main.innerHTML = '';
            movieContainer.innerHTML = ''; // Clear any previous movie container data
            searchResults.remove();
            currentMovieName = movieName;
            currentPage = 1;
  
            const data = await getMovieInfo(movieName);
            if (data) {
                showMovies(data, movieName);
            }
  
            inputBox.value = ''; // Clear the input field
        } else {
            alert('Please enter a movie name.');
        }
    });
  });