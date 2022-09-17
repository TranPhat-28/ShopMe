const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

// Import the function from module loginController
const { loginView, postLogin } = require('../controllers/loginController');
// Import the authenticate function from protect.js
// To check if user logged in or not before accessing this route
const allowAccess = require('../auth/protect');

// Tell router how to handle request
// Just like app.get or app.post in index.js
// GET Login
// Call the allowAccess function first, to check if user already logged in
router.get('/login', allowAccess, loginView);
// POST Login
router.post('/login', allowAccess, postLogin);


// Export the router
module.exports = router;