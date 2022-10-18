const express = require('express')
const router = express.Router()

// Import controller
const { myOrdersView, orderDetailView } = require('../controllers/myOrdersController')

// Import ProtectedRoute
const protectedRoute = require('../auth/protectedRoute')

// GET view for all orders
router.get('/myOrders', protectedRoute, myOrdersView)
// GET view for order detail view
router.get('/orderDetail', protectedRoute, orderDetailView)

module.exports = router