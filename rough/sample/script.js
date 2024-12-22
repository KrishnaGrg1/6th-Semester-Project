const express = require('express');
const app = express();
const path = require('path');
const cookieparser=require('cookie-parser')
const port = 8000;
const { connecttoMongoDB } = require('./connect');
const router = require('./routes/routes');
const {restrictToLoggedInUser,checkAuth}=require('./middleware/auth')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkAuth);

app.use('/', router); // Ensure this is correct

app.use(express.static("public"));
app.set('view engine', 'ejs');



connecttoMongoDB('mongodb://127.0.0.1:27017/movie')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
    });

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/home',restrictToLoggedInUser,(req,res)=>{
    res.render('home');
});

app.get('/contact',restrictToLoggedInUser,(req,res)=>{
    res.render('contact');
})




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});      