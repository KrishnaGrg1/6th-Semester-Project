const UserModel=require('../models/model');
const jwt = require('jsonwebtoken');
const {setUser,getUser,}=require('../services/auth');


async function register (req, res)  {
    const { fname,lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user= await UserModel.create({
        fname:fname,
        lname:lname,
        email:email,
        password: password,
    });
   
    
    console.log(user);
    res.render('login',{message: 'Succesfully Signup'}); 
};


async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            return res.render('login', { message: 'Invalid email or password' });
        }

      
        const token=setUser(user);
        res.cookie("uid", token, { httpOnly: true, secure: true });
        res.redirect('/home');  // After successful login, redirect to homepage
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal Server Error');
    }
}



module.exports = {
    register,
    login
};