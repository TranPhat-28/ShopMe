const express = require('express');
const router = express.Router();

// Tell router how to handle request
// Just like app.get or app.post in index.js
router.get('/login', (req, res) => {
   res.render('login.ejs');
});

// GET Register
router.get('/register', (req, res) => {
    res.render('register.ejs');
 });

// Export the router
module.exports = router;