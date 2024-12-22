const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/adminController');
const { restrictToLoggedinUserOnly, restrictToSubscribedUserOnly } = require('../middleware/authMiddleware');
const { getAllMovies, getMovieById, subscribe, searchMovies } = require('../controllers/movieController');
const User = require('../models/userModel'); // Import the UserModel

// Authentication Routes
// Register Route
router.get('/register', (req, res) => {
    res.render('auth/register', { message: '' }); // Pass an empty message
});

router.post('/register', register);

// Login Routes
router.get('/login', (req, res) => {
    res.render('auth/login', { message: '' }); // Pass an empty message
});
router.post('/login', login);

// Forget Password Route
router.get('/forgot-password', (req, res) => {
    res.render('auth/forgotPassword', { message: '' }); // Pass an empty message
});

router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.get('/reset-password/:token', (req, res) => {
    res.render('auth/resetPassword', { token: req.params.token, message: '' }); // Pass an empty message
});

router.post('/reset-password/:token', resetPassword);

// Logout Route
router.get('/logout', (req, res) => {
    // Clear the session cookie
    res.clearCookie('token');
    res.redirect('/login');
});

// Protected Routes
router.get('/home', restrictToLoggedinUserOnly, (req, res) => {
    res.render('user/home');
});

router.get('/contact', restrictToLoggedinUserOnly, (req, res) => {
    res.render('user/contact');
});

router.get('/admin', restrictToLoggedinUserOnly, (req, res) => {
    if (req.user.role === 'admin') {
        User.find({}, (err, users) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }
            res.render('admin/adminDashboard', { users });
        });
    } else {
        res.redirect('/home');
    }
});

router.get('/admin/edit/:id', restrictToLoggedinUserOnly, (req, res) => {
    if (req.user.role === 'admin') {
        const userId = req.params.id;
        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.render('admin/editUser', { user });
        });
    } else {
        res.redirect('/home');
    }
});

router.post('/admin/update/:id', restrictToLoggedinUserOnly, (req, res) => {
    if (req.user.role === 'admin') {
        const userId = req.params.id;
        const { fname, lname, email, password, subscription } = req.body;

        User.findByIdAndUpdate(userId, { fname, lname, email, password, subscription }, (err, user) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin');
        });
    } else {
        res.redirect('/home');
    }
});

router.get('/admin/feature-movie/:id', restrictToLoggedinUserOnly, (req, res) => {
    if (req.user.role === 'admin') {
        const movieId = req.params.id;
        res.render('admin/featureMovie', { movieId });
    } else {
        res.redirect('/home');
    }
});

router.post('/admin/feature-movie/:id', restrictToLoggedinUserOnly, (req, res) => {
    if (req.user.role === 'admin') {
        const movieId = req.params.id;
        res.redirect('/admin');
    } else {
        res.redirect('/home');
    }
});

// Customer Edit Route
router.get('/profile-edit', restrictToLoggedinUserOnly, (req, res) => {
    const userId = req.user._id;
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('user/profileEdit', { user });
    });
});

// Update Profile Route
router.post('/profile-update', restrictToLoggedinUserOnly, (req, res) => {
    const userId = req.user._id;
    const { fname, lname, email, password } = req.body;

    User.findByIdAndUpdate(userId, { fname, lname, email, password }, (err, user) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/home');
    });
});

// Subscription Management Route
router.get('/subscribe', restrictToLoggedinUserOnly, (req, res) => {
    res.render('user/subscribe');
});

router.post('/subscribe', restrictToLoggedinUserOnly, subscribe);

// Movie Routes
router.get('/movies', restrictToSubscribedUserOnly, getAllMovies);
router.get('/movie/:id', restrictToSubscribedUserOnly, getMovieById);

// Search Movies Route
router.get('/search-movies', restrictToSubscribedUserOnly, searchMovies);

// Add other routes as needed
router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;