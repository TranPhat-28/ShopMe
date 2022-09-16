// For testing purpose

const express = require('express');
const router = express.Router();


router.get('/test', (req, res) => {
    res.render('test.ejs', { email: req.user.email });
})

module.exports = router;