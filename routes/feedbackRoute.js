const express = require('express')
const router = express.Router()

// User authorization
const protectedRoute = require('../auth/protectedRoute')
// Controller
const { postFeedback, getFeedback } = require('../controllers/feedbackController')

// POST - For posting feedback
router.post('/postFeedback', protectedRoute, postFeedback)
// GET - For viewing feedback at productDetail page
router.get('/getFeedback', getFeedback)

module.exports = router