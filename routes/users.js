const express = require('express');

const router = express.Router();


//Login page
router.get('/login' , (req , res) => {
    res.send('Login');
});


//register 
router.get('/register' , (req , res) => {
    res.send('Register');
})

module.exports = router;