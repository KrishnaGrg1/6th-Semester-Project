const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/url');

// Register and login POST routes
router.post('/register', register);
router.post('/login', login); 

// Default routes
router.get('/login', (req, res) => {
  res.render('login', { message: '' }); // Default message is an empty string
});



module.exports = router;
