const express = require('express');
const router = express.Router();

// Controller
const { cartView, postCart, postAddToCart } = require('../controllers/cartController');

// Auth
const protectedRoute = require('../auth/protectedRoute');


// GET
router.get('/cart', protectedRoute, cartView);
// POST - This is for purchasing from cart page
// POST - This is for "Add to cart"
router.post('/addToCart', protectedRoute, postAddToCart);


module.exports = router;