const express = require('express');
const router = express.Router();


router.get('/contact',(req,res)=>{
  res.render('contact')  
})

router.get('/home', (req, res) => {
  res.render('home');
});



module.exports = router;
