const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./model/user'); // Ensure correct path to model
const dbconnection = require('./config/db'); // Ensure MongoDB connection is working
const ejs = require('ejs');
const port = 8000;

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

app.get('/get',(req,res)=>{
    userModel.find().then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err);
    })
})

app.get('/update',async(req,res)=>{
    await userModel.findOneAndUpdate({
        name:'a'
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
