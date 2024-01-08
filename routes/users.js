const express = require('express');

const router = express.Router();


//Login page
router.get('/login' , (req , res) => {
    res.render('login');
});


//register 
router.get('/register' , (req , res) => {
    res.render('register');
})

// Register Handle
router.post("/register" , (req,res)=>{
    const {name , email , password , password2} = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg : 'Please fill in all fields'});
    }

    //check password matches
    if (password !== password2){
        errors.push({msg : 'Passwords do not match'});
    }

    //check pass length
    if(password.length < 6){
        errors.push({msg: "Password must be at least 6 characters"});
    }

    if(errors.length > 0){
        res.render('register' , {
            errors ,
            name ,
            email ,
            password ,
            password2
        })
    }else{
        res.send('pass')
    }
})
module.exports = router;