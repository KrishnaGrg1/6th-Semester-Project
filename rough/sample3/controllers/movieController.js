const Movie = require('../models/movieModel');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('user/movies', { movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getMovieById = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.render('user/movieDetails', { movie });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addMovie = async (req, res) => {
    const { title, description, genre, releaseYear, rating, imageUrl } = req.body;

    try {
        const movie = new Movie({
            title,
            description,
            genre,
            releaseYear,
            rating,
            imageUrl
        });

        await movie.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editMovie = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.render('admin/editMovie', { movie });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const { title, description, genre, releaseYear, rating, imageUrl } = req.body;

    try {
        await Movie.findByIdAndUpdate(movieId, {
            title,
            description,
            genre,
            releaseYear,
            rating,
            imageUrl
        });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteMovie = async (req, res) => {
    const movieId = req.params.id;

    try {
        await Movie.findByIdAndDelete(movieId);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).send('Internal Server Error');
    }
};