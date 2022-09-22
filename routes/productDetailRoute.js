const express = require('express');
const router = express.Router();

// Import controller functions
const productDetailView = require('../controllers/productDetailController');

// GET
router.get('/productDetail', productDetailView);

// Export
module.exports = router;