// Import modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
dotenv.config();




// Set view engine
app.set('view engine', 'ejs');
// Get information from html form
app.use(express.urlencoded({ extended: false }));
// Set the directory for views
app.set('views', __dirname + '/views');
// Set the directory for public files
app.set(express.static('public'));



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
require('./auth/passport')(passport);




// Root route - will redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// POST Login route
app.post('/login', (req, res, next) => {
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
});



// Import the routers
const registerRouter = require('./routes/login');
//const loginRouter = require('./auth/passport');
const homeRouter = require('./routes/home');

const User = require('./models/user');
// Tell the app to use the router
// 1st param: root dir
// 2nd param: which router to handle the request
app.use('/', registerRouter);
//app.use('/', loginRouter);
app.use('/', homeRouter);



// Start the app
app.listen(process.env.PORT || 5000, console.log('Server started'));