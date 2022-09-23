const express = require('express');
const router = express.Router();

// Require controller
const { changePasswordView, postChangePassword } = require('../controllers/changePasswordController');

// Require auth
const protectedRoute = require('../auth/protectedRoute');


// GET
router.get('/changePassword', protectedRoute, changePasswordView);
// POST
router.post('/changePassword', protectedRoute, postChangePassword);

module.exports = router;