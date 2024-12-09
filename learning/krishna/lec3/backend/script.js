const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./model/user'); // Ensure correct path to model
const dbconnection = require('./config/db'); // Ensure MongoDB connection is working
const ejs = require('ejs');
const port = 8000;
const bcrypt = require('bcrypt');

const app = express();

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Serve static files (CSS, JS, etc.)
app.use(express.static("public"));
// Set view engine and views path
app.set('view engine', 'ejs');


// Serve static files (CSS, JS, etc.)
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});



app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const user = await userModel.findOne({ name, password });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // You can add session or token-based authentication here if needed.
        res.status(200).render('home');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});


// Handle POST request for registering user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

  const user= await userModel.create({
        name:name,
        email:email,
        password:password
    });
   
    
    console.log(user);
    res.render('login');

   
});

app.get('/get',(req,res)=>{
    userModel.find().then((data)=>{
        res.send(data);

    })
    .catch((err)=>{
        res.send(err);
    })
})

// Handle POST request for registering user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

  const user= await userModel.create({
        name:name,
        email:email,
        password:password
    });
   
    res.send(user);
    console.log(user);

   
});


app.get('/homepage',(req,res)=>{
    res.render('home');
});


app.get('/allmovie',(req,res)=>{
    res.render('allmovie');
})
app.get('/update',async(req,res)=>{
    await userModel.findOneAndUpdate({
        name:'Krishna'
    },{
        name:'Admin',
        email:'admin@gmail.com',
        password:'admin'
    })
    res.send('Updated');
})

app.get('/delete',async(req,res)=>{
    await userModel.findOneAndDelete({
        name:'ab'
    })
    res.send('Deleted');
})
app.post('/get',(req,res)=>{
    userModel.find({_id:req.body.id}).then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err);
    })
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});


