const express = require('express');
const router = express.Router();


// Require controller
const { reportView, postReport } = require('../controllers/reportController');
// Require login check
const protectedRoute = require('../auth/protectedRoute');


// GET
router.get('/report', protectedRoute, reportView);
// POST
router.post('/report', protectedRoute, postReport);

module.exports = router;