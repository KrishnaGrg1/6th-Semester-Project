const express = require('express');
const app = express();
const path = require('path');
const port = 8001;
const { connecttoMongoDB } = require('./connect');
const router = require('./routes/routes');

const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly } = require('./middleware/auth');
const { getUserId } = require('./services/auth');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// Routes
app.use('/', router);


// MongoDB connection
connecttoMongoDB('mongodb://127.0.0.1:27017/movie-streaming')
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