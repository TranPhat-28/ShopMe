// Import modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');

const loginView = (req, res) => {
    res.render('login.ejs');
}

const postLogin = (req, res, next) => {
    // Get all the input from user and check if any fields is empty
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        //console.log("Missing required field(s)");
        res.send("<script>alert('Missing required field(s)'); window.location.href='/login'; </script>");
    }
    else {
        try {
            passport.authenticate('local', {
                successRedirect: "/home",
                failureRedirect: "/login",
                failureFlash: true,
            })(req, res, next);
        } catch (e) {
            console.log(e.message);
        }
    }
}

// Export the module for route file to use
module.exports = {
    loginView,
    postLogin
};