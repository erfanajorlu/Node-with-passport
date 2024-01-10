const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

//User model
const User = require("../models/user");

//Login page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

//register
router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("register");
});

// Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //check password matches
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then( (user) => {
      if (user) {
        //User exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});
// Logout
// Logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      // Handle error if logout encountered an issue
      console.error(err);
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});


module.exports = router;
