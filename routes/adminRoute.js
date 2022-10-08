const express = require('express');
const router = express.Router();
// Multer and fs for handling file
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Import adminProtect to verify ADMIN
const adminProtected = require('../auth/adminProtect');

// Import controllers
const ordersView = require('../controllers/adminController/ordersController');
const { customersAndProductsView, productDetailView, postCustomersAndProducts, userDetailView } = require('../controllers/adminController/customersAndProductsController');
const { addProductView, postAddProduct } = require('../controllers/adminController/addProductController');
const { userReportView, postUserReport, reportDetailView } = require('../controllers/adminController/userReport');
const { editProductView, searchEditName, searchEditID, postEditProduct } = require('../controllers/adminController/editProductController');




// Because inside index.js we specified '/admin' before
// using this router, here we will need <routeName>
// Full route will be /admin/<routeName>



// GET orders
router.get('/orders', adminProtected, ordersView);



// GET customersAndProducts
router.get('/customersAndProducts', adminProtected, customersAndProductsView);
// POST customersAndProducts
router.post('/customersAndProducts', adminProtected, postCustomersAndProducts);
// Sub route for AJAX fetching product / user detail information
// For product
router.get('/productDetail', adminProtected, productDetailView);
// For user
router.get('/userDetail', adminProtected, userDetailView);



// GET addProducts
router.get('/addProduct', adminProtected, addProductView);
// POST addProducts
// Uploading image to mongoDB Atlas
router.post('/addProduct', upload.single('picture'), postAddProduct);




// GET view for editProduct
router.get('/editProduct', adminProtected, editProductView);
// Search product for editProduct
// By name and by ID
router.post('/searchEditName', adminProtected, searchEditName);
router.post('/searchEditID', adminProtected, searchEditID);
// Update product info
router.post('/editProduct', adminProtected, postEditProduct);



// GET userReport
router.get('/report', adminProtected, userReportView);
// GET report detail using AJAX
router.get('/reportDetail', adminProtected, reportDetailView);
// POST delete report
router.post('/report', adminProtected, postUserReport);

module.exports = router;