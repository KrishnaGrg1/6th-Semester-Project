const API_KEY = '576de2fd895bd4c93d0593bdd3e50ec9';
console.log("Api: ", API_KEY);

const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';  // Add endpoint to get movies

// Fetch the movie data from TMDB API
const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`);

if (response.ok) {
  // Parse the response data
  const data = await response.json();

  // Access the total number of results
  const totalMovies = data.total_results;
  console.log("Total Movies: ", totalMovies);
} else {
  console.error("Error fetching data from TMDB:", response.statusText);
}
