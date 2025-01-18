// services/movieService.js
import axios from 'axios';
const api_Key = '4626200399b08f9d04b72348e3625f15'; // Replace with your actual API key

async function fetchMovieDetails(movieId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_Key}&append_to_response=videos`);
        const movie = response.data;
        const trailer = movie.videos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
        const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

        return {
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            vote_average: movie.vote_average,
            genres: movie.genres.map(genre => genre.name),
            release_date: movie.release_date,
            overview: movie.overview,
            trailer_url: trailerUrl
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

export default fetchMovieDetails ;