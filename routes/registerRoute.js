const express = require('express');
const router = express.Router();

// Import the function from module registerController
const { registerView, postRegister } = require('../controllers/registerController');
// Import the authenticate function from protect.js
// To check if user logged in or not before accessing this route
const allowAccess = require('../auth/protect');

// Tell router how to handle request
// Just like app.get or app.post in index.js
// Call the allowAccess function first, to check if user already logged in
router.get('/register', allowAccess, registerView);
router.post('/register', allowAccess, postRegister);

// Export the router
module.exports = router;