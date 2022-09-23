const express = require('express');
const router = express.Router();
// Multer and fs for handling file
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Import adminProtect to verify ADMIN
const adminProtected = require('../auth/adminProtect');

// Import modules
const ordersView = require('../controllers/adminController/ordersController');
const { customersAndProductsView, productDetailView, postCustomersAndProducts, userDetailView } = require('../controllers/adminController/customersAndProductsController');
const { addProductView, postAddProduct } = require('../controllers/adminController/addProductController');

// Because inside index.js we specified '/admin' before
// using this router, here we will need <routeName>
// Full route will be /admin/<routeName>



// GET orders
router.get('/orders', adminProtected, ordersView);



// GET customersAndProducts
//router.get('/customersAndProducts', adminProtected, customersAndProductsView);
router.get('/customersAndProducts', customersAndProductsView);
// POST customersAndProducts
router.post('/customersAndProducts', postCustomersAndProducts);
// Sub route for AJAX fetching product / user detail information
// For product
router.get('/productDetail', productDetailView);
// For user
router.get('/userDetail', userDetailView);



// GET addProducts
router.get('/addProduct', adminProtected, addProductView);
// POST addProducts
// Uploading image to mongoDB Atlas
router.post('/addProduct', upload.single('picture'), postAddProduct);

module.exports = router;