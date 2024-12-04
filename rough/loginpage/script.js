document.addEventListener('DOMContentLoaded', () => {
    // Initialize page number for pagination
    let page = 1;
  
    // Fetch Trending Movies (example query)
    const movieName = 'trending'; // Default query for trending movies
  
    fetchMovies(movieName, page);
  
    // Fetch Continue Watching (you can modify this based on your use case)
    fetchContinueWatching();
    
    // Fetch Now Trending (can use a similar method to fetch data for now trending)
    fetchNowTrending();
    
    // Fetch Top Picks (can also use movie search for personalized picks)
    fetchTopPicks();
  });
  
  // Function to fetch movies from TMDb API
  function fetchMovies(movieName, page) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=7390c31e7d4f58c4b9afbc61a12f010e&query=${movieName}&page=${page}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const movieResults = data.results;
        
        // Get the container where movies will be displayed (e.g., Trending, Top Picks)
        const trendingContainer = document.querySelector('.trending-content');
        const topPicksContainer = document.querySelector('.movie-cards');
  
        // Clear the container before appending new movies
        trendingContainer.innerHTML = '';
        topPicksContainer.innerHTML = '';
  
        movieResults.forEach(movie => {
          // Create movie item for "Now on Trending" section
          const trendingDiv = document.createElement('div');
          trendingDiv.classList.add('info');
          trendingDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
          `;
          trendingContainer.appendChild(trendingDiv);
  
          // Create movie card for "Top Picks" section
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('card');
          cardDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
            <div class="details">
              <h4>${movie.title}</h4>
            </div>
          `;
          topPicksContainer.appendChild(cardDiv);
        });
      })
      .catch(error => console.error('Error fetching movie data:', error));
  }
  
  // Function to fetch continue watching (can be a custom implementation based on user data)
  function fetchContinueWatching() {
    // Placeholder for continue watching API call
    console.log('Fetching continue watching...');
    // Replace this with your actual API call for continue watching if you have a backend
  }
  
  // Function to fetch now trending (use the same search or modify as needed)
  function fetchNowTrending() {
    const movieName = 'trending'; // Or you can change it to fetch specific trending movies
    
    fetchMovies(movieName, 1); // Just call the fetchMovies function for now trending
  }
  
  // Function to fetch top picks (can be customized based on user preferences)
  function fetchTopPicks() {
    const movieName = 'popular'; // You can change this to popular or other search queries
    
    fetchMovies(movieName, 1); // Fetch based on a different query (e.g., popular movies)
  }
  