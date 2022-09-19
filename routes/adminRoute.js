const express = require('express');
const router = express.Router();

// Import adminProtect to verify ADMIN
const adminProtected = require('../auth/adminProtect');

// Import modules
const customersAndProductsView = require('../controllers/adminController/customersAndProductsController');
const addProductView = require('../controllers/adminController/addProductController');

// Because inside index.js we specified '/admin' before
// using this router, here we will need <routeName>
// Full route will be /admin/<routeName>

// GET customersAndProducts
router.get('/customersAndProducts', adminProtected, customersAndProductsView);


// GET addProducts
router.get('/addProduct', adminProtected, addProductView);

module.exports = router;