const fetch = require('node-fetch'); // to make API requests
const api_Key = '4626200399b08f9d04b72348e3625f15';
const baseUrl = 'https://api.themoviedb.org/3/';

// Render Home Page
async function renderHomePage(req, res) {
  try {
    // Fetch the necessary movie data
    const trendingMovies = await fetchTrendingMovies();
    const topPicks = await fetchTopPicks();
    const continueWatching = await fetchContinueWatching();

    // Render the homepage with fetched data
    res.render('home', {
      trendingMovies,
      topPicks,
      continueWatching
    });
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).send('Error fetching movie data.');
  }
}

// Fetch trending movies
async function fetchTrendingMovies() {
  const response = await fetch(`${baseUrl}trending/all/week?api_key=${api_Key}`);
  const data = await response.json();
  return data.results.slice(0, 6); // Return top 6 trending movies
}

// Fetch top picks for you
async function fetchTopPicks() {
  const response = await fetch(`${baseUrl}movie/top_rated?api_key=${api_Key}`);
  const data = await response.json();
  return data.results.slice(0, 4); // Return top 4 movies
}

// Fetch continue watching list
async function fetchContinueWatching() {
  const response = await fetch(`${baseUrl}trending/movie/week?api_key=${api_Key}`);
  const data = await response.json();
  return data.results.slice(0, 3); // Return top 3 movies
}

// Search Movies based on query
async function searchMovies(req, res) {
    const query = req.body.query;
    try {
      const response = await fetch(`${baseUrl}search/multi?api_key=${api_Key}&query=${query}`);
      const data = await response.json();
      res.json(data.results); // Return the search results
    } catch (error) {
      console.error('Error fetching search results:', error);
      res.status(500).send('Error fetching search results.');
    }
  }
  

module.exports = {
  renderHomePage,
  fetchTrendingMovies,
  fetchTopPicks,
  fetchContinueWatching,
  searchMovies
};
