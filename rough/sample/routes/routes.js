const express=require('express');
const router=express.Router();

const {register,login}=require('../controller/url');



router.post('/register', register);
router.post('/login', login); 

// Ensure to render the login page with a default message when accessed directly
router.get('/login', (req, res) => {
  res.render('login', { message: '' }); // Default message is an empty string
});


;
  
module.exports = router;

