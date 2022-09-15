const express = require('express');
const router = express.Router();

// Import the function from module registerController
const { registerView, postRegister } = require('../controllers/registerController');

// Tell router how to handle request
// Just like app.get or app.post in index.js
router.get('/register', registerView);
router.post('/register', postRegister);

// Export the router
module.exports = router;