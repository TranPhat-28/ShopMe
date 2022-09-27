const express = require('express')
const router = express.Router()

// Require controllers
const confirmOrder = require('../controllers/confirmOrderController')


// Require protectedRoute
const protectedRoute = require('../auth/protectedRoute')


// POST
// Use POST because we do not want user to type URL
// directly into browser
router.post('/confirmOrder', protectedRoute, confirmOrder)


module.exports = router