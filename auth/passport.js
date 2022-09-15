// Import modules
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');




// POST Login route
router.post('/login', (req, res, next) => {
    // Get all the input from user and check if any fields is empty
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        console.log("Missing required field(s)");
        res.send("<script>alert('Missing required field(s)'); window.location.href='/login'; </script>");
    }
    else {
        try{
            passport.authenticate('local', {
                successRedirect: "/test",
                failureRedirect: "/login",
                failureFlash: true,
            })(req, res, next);
        }catch(e){
            console.log(e.message);
        }
    }

    /*
    try{
        // Get all the input from user and check if any fields is empty
        const email = req.body.email;
        const password = req.body.password;
        
        
        
        // Check for missing field(s)
        if (!email || !password ){
            console.log("Missing required field(s)");
            res.send("<script>alert('Missing required field(s)'); window.location.href='/register'; </script>");
        }
        else{
            // Validate email
            User.findOne({ email: email }).then((user) => {
                if(!user){
                    console.log("Incorrect email");
                    res.send("<script>alert('Incorrect email!'); window.location.href='/login'; </script>");
                }
                else{
                    // Validate password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch){
                            console.log("OK");
                            //console.log(user);
                            // Use passport
                            passport.use(new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
                                return done(null, user);
                            }))
                            res.send("<script>alert('OK!'); window.location.href='/test'; </script>");
                        }
                        else{
                            console.log("Incorrect password");
                            res.send("<script>alert('Incorrect password!'); window.location.href='/login'; </script>");
                        }
                    })
                }
            })
            .catch(err => console.log(err));        
        }


        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            })
        });
    }
    catch(e){}
    */


    // THE ABOVE IS GOOD

});

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            //Check customer
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        console.log("wrong email");
                        res.send("<script>alert('Incorrect email!'); window.location.href='/login'; </script>");
                        return done();
                    }
                    //Match Password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("Wrong password");
                            res.send("<script>alert('Incorrect password!'); window.location.href='/login'; </script>");
                            return done();
                        }
                    });
                })
                .catch((error) => console.log(error));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
};