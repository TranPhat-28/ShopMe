const express = require('express')
const router = express.Router()

// User authorization
const protectedRoute = require('../auth/protectedRoute')
// Controller
const postFeedback = require('../controllers/feedbackController')

// POST - For posting feedback
router.post('/postFeedback', protectedRoute, postFeedback)

module.exports = router