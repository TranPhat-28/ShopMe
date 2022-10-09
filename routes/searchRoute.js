const express = require('express')
const router = express.Router()

const searchView = require('../controllers/searchController')


//router.get('/search', searchView)
router.get('/search', (req, res) => {
    if (!req.query.page) {
        let redirectUrl = req.originalUrl;
        if (redirectUrl.includes("?")) {
           redirectUrl += "&page=1";
        } else {
           redirectUrl += "?page=1";
        }
        res.redirect(redirectUrl);
    } else {
        searchView(req, res)
    }
})


module.exports = router