// Define the API key and base URL
const api_Key = '4626200399b08f9d04b72348e3625f15';
const baseUrl = 'https://api.themoviedb.org/3/';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Function to fetch search results based on user input
async function fetchSearchResults(query) {
    try {
        const response = await fetch(`${baseUrl}search/multi?api_key=${api_Key}&query=${query}`);
        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

// Event listener for search input changes
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();

    // If there is something typed, fetch the search results
    if (query) {
        fetchSearchResults(query);
    } else {
        searchResults.innerHTML = ''; // Clear results if no input
        searchResults.classList.remove('visible'); // Hide results when input is empty
    }
});

// Function to display search results
function displaySearchResults(results) {
    searchResults.innerHTML = ''; // Clear previous results

    // Show results container if there are results
    if (results.length > 0) {
        searchResults.classList.add('visible');
    } else {
        searchResults.classList.remove('visible');
    }

    results.slice(0, 10).forEach(result => {
        const title = result.title || result.name;
        const posterPath = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'placeholder.jpg';
        const date = result.release_date || result.first_air_date;

        const movieItem = document.createElement('div');
        movieItem.classList.add('search-item');
        movieItem.innerHTML = `
            <div class="search-item-thumbnail">
                <img src="${posterPath}" alt="${title}">
            </div>
            <div class="search-item-info">
                <h3>${title}</h3>
                <p>${result.media_type} <span>&nbsp; ${date}</span></p>
            </div>
            <button class="watchListBtn" id="${result.id}">Add to Playlist</button>
        `;
        searchResults.appendChild(movieItem);
    });
}
