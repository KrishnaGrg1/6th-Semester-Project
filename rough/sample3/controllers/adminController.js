const User = require('../models/userModel');
const { fetchPopularMovies } = require('../services/tmdbService');

exports.getAdminDashboard = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/adminDashboard', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('admin/editUser', { user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { fname, lname, email, password, subscription } = req.body;

    try {
        await User.findByIdAndUpdate(userId, { fname, lname, email, password, subscription });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.featureMovie = async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await fetchMovieDetails(movieId);
        // Save the movie to the featured list or update its status
        // For simplicity, we'll just log the movie details
        console.log('Featured Movie:', movie);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error featuring movie:', error);
        res.status(500).send('Internal Server Error');
    }
};