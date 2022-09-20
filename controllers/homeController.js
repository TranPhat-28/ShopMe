const Product = require('../models/product');

// GET Home
const homeView = (req, res) => {
    // Check if logged in or not
    if (!req.user){
        res.render('home.ejs', { role: null });
    }
    else{
        res.render('home.ejs', { role: req.user.role, email: req.user.email });
    }
}

// Export module
module.exports = homeView;