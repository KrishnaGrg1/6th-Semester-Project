const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchPopularMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                page: 1
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

async function fetchMovieDetails(movieId) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

async function searchMovies(query) {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                query
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
}

module.exports = { fetchPopularMovies, fetchMovieDetails, searchMovies };