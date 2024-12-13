document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("search-movie");
    const searchResults = document.getElementById("searchResults");
  
    const trendingContainer = document.querySelector(".trending-content");
    const topPicksContainer = document.querySelector(".movie-cards");
    const continueWatchingContainer = document.getElementById("continueWatchingList");
  
    const movieContainer = document.querySelector(".movie-container");
  
    // Fetch movie data on page load
    fetch('/fetchData')
      .then(response => response.json())
      .then(data => {
        populateTrendingMovies(data.trendingMovies);
        populateTopPicks(data.topPicks);
        populateContinueWatching(data.continueWatching);
      })
      .catch(error => console.error('Error fetching movie data:', error));
  
    // Populate trending movies
    function populateTrendingMovies(movies) {
      trendingContainer.innerHTML = movies
        .map(
          movie => `
          <div class="trending-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title || movie.name}</p>
          </div>
        `
        )
        .join("");
    }
  
    // Populate top picks
    function populateTopPicks(movies) {
      topPicksContainer.innerHTML = movies
        .map(
          movie => `
          <div class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title || movie.name}</p>
          </div>
        `
        )
        .join("");
    }
  
    // Populate continue watching
    function populateContinueWatching(movies) {
      continueWatchingContainer.innerHTML = movies
        .map(
          movie => `
          <li>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <span>${movie.title || movie.name}</span>
          </li>
        `
        )
        .join("");
    }
  
    // Handle search functionality
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        fetch('/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        })
          .then(response => response.json())
          .then(results => {
            if (results.length > 0) {
              displaySearchResults(results);
            } else {
              searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
            }
          })
          .catch(error => console.error('Error fetching search results:', error));
      }
    });
  
    // Display search results
    function displaySearchResults(results) {
      searchResults.innerHTML = results
        .map(
          result => `
          <div class="search-item">
            <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">
            <p>${result.title || result.name}</p>
          </div>
        `
        )
        .join("");
    }
  });
  