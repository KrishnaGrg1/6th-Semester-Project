import express from 'express';
const app = express();
import  path from 'path';
const port = 8001;
import  { connecttoMongoDB } from './connect.js';


import cookieParser from 'cookie-parser';
import mainRouter from './routes/routes.js';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// Routes
app.use('/', mainRouter);


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