const UserModel=require('../models/model');
const bcrypt=require('bcrypt');

async function register (req, res)  {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

  const user= await UserModel.create({
        name:name,
        email:email,
        password:password
    });
   
    
    console.log(user);
    res.render('login'); 
};


async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }
    console.log(email);
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        // Continue with password verification and login success
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal Server Error');
    }
    res.render('home')
}



module.exports = {
    register,
    login
};