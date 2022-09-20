const express = require('express');
const router = express.Router();
// Multer and fs for handling file
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Import adminProtect to verify ADMIN
const adminProtected = require('../auth/adminProtect');

// Import modules
const customersAndProductsView = require('../controllers/adminController/customersAndProductsController');
const { addProductView, postAddProduct } = require('../controllers/adminController/addProductController');

// Because inside index.js we specified '/admin' before
// using this router, here we will need <routeName>
// Full route will be /admin/<routeName>

// GET customersAndProducts
router.get('/customersAndProducts', adminProtected, customersAndProductsView);


// GET addProducts
router.get('/addProduct', adminProtected, addProductView);
//router.post('/addProduct', adminProtected, postAddProduct);

// Uploading image to mongoDB Atlas
router.post('/addProduct', upload.single('picture'), postAddProduct);

module.exports = router;