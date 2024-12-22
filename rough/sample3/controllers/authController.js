const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { sendWelcomeEmail, sendResetEmail } = require('../services/authService');

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const { fname, lname, email, password, confirmPassword } = req.body;

    if (!fname || !lname || !email || !password || !confirmPassword) {
        return res.render('auth/register', { message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.render('auth/register', { message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', { message: 'User already exists' });
        }

        const user = await User.create({
            fname,
            lname,
            email,
            password,
        });

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.redirect('/home');  // Redirect to home page after successful registration

        sendWelcomeEmail(user.email);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.render('auth/register', { message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('auth/login', { message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.redirect('/home');  // After successful login, redirect to homepage
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.render('auth/forgotPassword', { message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('auth/forgotPassword', { message: 'User not found' });
        }

        const token = uuidv4();
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        await sendResetEmail(email, token);

        res.render('auth/forgotPassword', { message: 'Reset link has been sent to your email' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.render('auth/forgotPassword', { message: 'Internal Server Error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.render('auth/resetPassword', { token, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.render('auth/resetPassword', { token, message: 'Passwords do not match' });
    }

    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
        if (!user) {
            return res.render('auth/resetPassword', { token, message: 'Invalid or expired token' });
        }

        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Error resetting password:', error);
        res.render('auth/resetPassword', { token, message: 'Internal Server Error' });
    }
};