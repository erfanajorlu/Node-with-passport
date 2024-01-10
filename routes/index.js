const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Login page
router.get('/' ,forwardAuthenticated, (req , res) => {
    res.render('welcome');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated , (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;