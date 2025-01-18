import express from 'express';
const app = express();
import  path from 'path';
import { config } from 'dotenv';
config()
const port =process.env.PORT;
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
connecttoMongoDB(process.env.MONGODB_URL)
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