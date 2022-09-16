// Config file for passport
// Import modules
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;



// Config passport and export
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            //Check customer
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        console.log("wrong email");
                        return done();
                    }
                    //Match Password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("Wrong password");
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