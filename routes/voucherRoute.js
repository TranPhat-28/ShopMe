const express = require('express')
const router = express.Router()

// Import controller
const voucherView = require('../controllers/voucherController')

// Get view
router.get('/voucher', voucherView)

module.exports = router