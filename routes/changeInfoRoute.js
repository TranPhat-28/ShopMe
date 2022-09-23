const express = require('express');
const router = express.Router();

// Import the function from module changeInfoController
const { changeInfoView, postChangeInfo } = require('../controllers/changeInfoController');

// Import the authenticate function from protectedRoute.js
// To check if user logged in or not before accessing this route
const protectedRoute = require('../auth/protectedRoute');

// Tell router how to handle request
// Just like app.get or app.post in index.js

// Call the protectedRoute function first, to check if user has logged in
router.get('/changeInfo', protectedRoute, changeInfoView);
router.post('/changeInfo', protectedRoute, postChangeInfo);

// Export the router
module.exports = router;