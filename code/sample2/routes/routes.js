// routes/routes.js
import express from 'express';
const UserModel=require('../models/model');
const router = express.Router();
const { register, login } = require('../controller/authController');
const { restrictToLoggedinUserOnly} = require('../middleware/auth');
const { fetchMovieDetails } = require('../services/movieService');

router.post('/register', register);

router.get('/register',(req,res)=>{
    res.render('register');
})

// Login Routes
router.get('/login', (req, res) => {
    res.render('login', { message: '' });
});
router.post('/login', login);

// Logout Route
router.get('/logout', (req, res) => {
    // Clear the session cookie
    res.clearCookie('uid');
    res.redirect('/login');
});


// Home Page Route (GET)
router.get('/home', restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const loggedInUser = await UserModel.findById(req.user._id);  // Get the logged-in user by ID
        res.render('home', { user: loggedInUser });  // Pass the logged-in user data to the home page view
    } catch (error) {
        console.error('Error loading home page:', error);
        res.status(500).send('Error loading home page');
    }
});


router.get('/contact', restrictToLoggedinUserOnly,async (req, res) => {
    

    try {
        const loggedInUser = await UserModel.findById(req.user._id);  // Get the logged-in user by ID
        res.render('contact1', { user: loggedInUser });  // Pass the logged-in user data to the home page view
    } catch (error) {
        console.error('Error loading home page:', error);
        res.status(500).send('Error loading home page');
    }
});

router.get('/about', restrictToLoggedinUserOnly,async (req, res) => {
    

    try {
        const loggedInUser = await UserModel.findById(req.user._id);  // Get the logged-in user by ID
        res.render('about', { user: loggedInUser });  // Pass the logged-in user data to the home page view
    } catch (error) {
        console.error('Error loading home page:', error);
        res.status(500).send('Error loading home page');
    }
});
router.get('/pricing', restrictToLoggedinUserOnly,async (req, res) => {
    

    try {
        const loggedInUser = await UserModel.findById(req.user._id);  // Get the logged-in user by ID
        res.render('pricing', { user: loggedInUser });  // Pass the logged-in user data to the home page view
    } catch (error) {
        console.error('Error loading home page:', error);
        res.status(500).send('Error loading home page');
    }
});


// Movie Details Route
router.get('/movie/:id', restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const movieId = req.params.id;
        const movieDetails = await fetchMovieDetails(movieId);
        res.render('movie_details', { movie: movieDetails, user: req.user });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).send('Error fetching movie details');
    }
});


// Profile Edit Route (GET)
router.get('/edit-profile', restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const loggedInUser = req.user;  // Logged-in user (admin)
        const userId = loggedInUser._id;  // Get logged-in user's ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log(user)

        if (user.role === "user") {
            // If regular user, render 'edit-profile' view
            res.render('edit-profile', { loggedInUser, user ,message: ''});
        } else if (user.role === "admin") {
            // If admin, render 'adminEditProfile' view and pass necessary data
            const users = await UserModel.find();  // Fetch all users for admin to manage
            const selectedUserId = req.query.userId || userId;
            const userToEdit = await UserModel.findById(selectedUserId);

            // Pass 'loggedInUser', 'user', 'users', and 'userToEdit' to the template
            res.render('adminEditProfile', { loggedInUser, user, users, userToEdit, message: '' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// Profile Update Route (POST)
router.post('/profile-update', restrictToLoggedinUserOnly, async (req, res) => {
    const userId = req.user._id;
    const { fname, lname, email, password } = req.body;

    // Find the user by ID and update their profile
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { fname, lname, email, password }, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
       
        // Redirect to the 'home' page after successful update
        res.redirect('/edit-profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Admin Profile Update Route (POST)
router.post('/admin-profile-update', restrictToLoggedinUserOnly, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Forbidden');
    }

    const { userId, fname, lname, email, password } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { fname, lname, email, password }, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        
        // Redirect to the 'adminEditProfile' page after successful update
        res.redirect(`/edit-profile?userId=${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Add other routes as needed
router.get('/', (req, res) => {
    res.redirect('/login');
});


// Add a movie to the playlist
router.post('/add-to-playlist', restrictToLoggedinUserOnly, async (req, res) => {
    const { movieId, title, poster_path } = req.body;
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const movieExists = user.playlist.some(movie => movie.movieId === movieId);
        if (movieExists) {
            return res.status(400).send('Movie already in playlist');
        }

        user.playlist.push({ movieId, title, poster_path });
        await user.save();
        res.send('Movie added to playlist');
    } catch (error) {
        console.error('Error adding movie to playlist:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get user's playlist
router.get('/playlist', restrictToLoggedinUserOnly, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId).populate('playlist');
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('playlist', { user: user });
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Remove a movie from the playlist
router.post('/remove-from-playlist', restrictToLoggedinUserOnly, async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.playlist = user.playlist.filter(movie => movie.movieId !== movieId);
        await user.save();
        res.send('Movie removed from playlist');
    } catch (error) {
        console.error('Error removing movie from playlist:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Edit a movie in the playlist
router.post('/edit-playlist', restrictToLoggedinUserOnly, async (req, res) => {
    const { movieId, newTitle, newPosterPath } = req.body;
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const movieIndex = user.playlist.findIndex(movie => movie.movieId === movieId);
        if (movieIndex === -1) {
            return res.status(404).send('Movie not found in playlist');
        }

        user.playlist[movieIndex].title = newTitle;
        user.playlist[movieIndex].poster_path = newPosterPath;
        await user.save();
        res.send('Movie edited in playlist');
    } catch (error) {
        console.error('Error editing movie in playlist:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;