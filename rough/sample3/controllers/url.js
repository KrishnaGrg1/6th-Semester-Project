
const UserModel = require('../models/model');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/authService');
const nodemailer = require('nodemailer');

async function register(req, res) {
    const { fname, lname, email, password, confirmPassword } = req.body;

    if (!fname || !lname || !email || !password || !confirmPassword) {
        return res.render('register', { message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.render('register', { message: 'Passwords do not match' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.render('register', { message: 'User already exists' });
        }

        const user = await UserModel.create({
            fname,
            lname,
            email,
            password,
        });

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId, { httpOnly: true, secure: true });
        res.redirect('/home');  // Redirect to home page after successful registration
    } catch (error) {
        console.error('Error creating user:', error);
        return res.render('register', { message: 'Internal Server Error' });
    }
}

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

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId, { httpOnly: true, secure: true });
        res.redirect('/home');  // After successful login, redirect to homepage
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal Server Error');
    }
}



// Function to send email
async function sendResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email address
            pass: 'your-email-password' // Your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: http://localhost:8001/reset-password/${token}`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.render('forgotPassword', { message: 'Email is required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.render('forgotPassword', { message: 'User not found' });
        }

        const token = uuidv4();
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        await sendResetEmail(email, token);

        res.render('forgotPassword', { message: 'Reset link has been sent to your email' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.render('forgotPassword', { message: 'Internal Server Error' });
    }
}

async function resetPassword(req, res) {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.render('resetPassword', { token, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.render('resetPassword', { token, message: 'Passwords do not match' });
    }

    try {
        const user = await UserModel.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
        if (!user) {
            return res.render('resetPassword', { token, message: 'Invalid or expired token' });
        }

        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Error resetting password:', error);
        res.render('resetPassword', { token, message: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};

