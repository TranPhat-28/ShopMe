const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

// Import the function from module loginController
const { loginView, postLogin } = require('../controllers/loginController');


// Tell router how to handle request
// Just like app.get or app.post in index.js
// GET Login
router.get('/login', loginView);
// POST Login
router.post('/login', postLogin);


// Export the router
module.exports = router;