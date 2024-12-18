const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const { connecttoMongoDB } = require('./connect');
const router = require('./routes/routes');
const hrouter = require('./routes/hroutes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const cors = require('cors');
const { restrictToLoggedinUserOnly } = require('./middleware/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Middleware to handle user session restriction
app.use('/',  router);
app.use('/', hrouter);

// Protect the /home route with restrictToLoggedinUserOnly middleware
app.get('/home',restrictToLoggedinUserOnly, (req, res) => {
    res.render('home', { user: req.user });  // Pass user data to the home page
});

app.get('/contact',restrictToLoggedinUserOnly,(req, res) => {
    res.render('contact');
  });

app.get('/login', (req, res) => {
    res.render('login', { message: '' });  // Default login page with empty message
});
app.get('/register', (req, res) => {
  res.render('register');
});

// MongoDB connection
connecttoMongoDB('mongodb://127.0.0.1:27017/movie')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
