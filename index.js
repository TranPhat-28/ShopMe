// Import modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
dotenv.config();
// Method override - for logging out
const methodOverride = require('method-override');



// Set view engine
app.set('view engine', 'ejs');
// Get information from html form
app.use(express.urlencoded({ extended: false }));
// Send message
app.use(flash());
// Set the directory for views
app.set('views', __dirname + '/views');
// Set the directory for public files: media and css
app.use(express.static( __dirname + '/public'));



// MongoDB connection
const db = process.env.DATABASE_URL;
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(e.message));



// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Require passport config file
require('./auth/passport')(passport);
// Use method override
app.use(methodOverride('_method'));




// ROOT route - will redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Import router
// Tell the app to use the routers we defined
// 1st param: root dir
// 2nd param: which router to handle the request
// Eg: app.use('/', registerRouter);


// Logout route
// Use methodOverride to override POST to DELETE
app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

// Register route
const registerRouter = require('./routes/registerRoute');
app.use('/', registerRouter);
// Login route
const loginRouter = require('./routes/loginRoute');
app.use('/', loginRouter);
// Change information route
const changeInfoRouter = require('./routes/changeInfoRoute');
app.use('/', changeInfoRouter);
// Home route
const homeRouter = require('./routes/homeRoute');
app.use('/', homeRouter);



// Test route - for testing only
const testRoute = require('./routes/testRoute');
app.use('/', testRoute);




// START THE APP
app.listen(process.env.PORT || 5000, console.log('Server started'));