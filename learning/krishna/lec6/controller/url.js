const UserModel=require('../models/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;



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
    res.render('login',{message: ''}); 
};


async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }
    console.log(email);
    console.log(password);
    try {
        const user = await UserModel.findOne({ email,password});
        if (!user) {
            return res.render('login', { message: 'Invalid email or password' });
        }
        
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.render('login', { message: 'Invalid email or password' });
        // }
        // console.log(isMatch);
        // If email and password are correct, proceed with login success
        res.render('home');
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal Server Error');
    }
    
}


module.exports = {
    register,
    login
};