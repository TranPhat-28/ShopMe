// Import modules
const express = require('express');
const router = express.Router();

// Import the function from homeController
const homeView = require('../controllers/homeController');

// GET home
router.get('/home', homeView);

// Export router
module.exports = router;