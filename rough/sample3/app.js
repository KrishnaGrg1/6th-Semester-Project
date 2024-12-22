const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8001;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const { connectToMongoDB } = require('./services/databaseService');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Routes
app.use('/', router);

// MongoDB connection
connectToMongoDB(process.env.MONGO_URI)
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