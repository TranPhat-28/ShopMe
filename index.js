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
// Set the directory for views (and admin view in the subfolder)
//app.set('views', __dirname + '/views');
app.set('views', [__dirname + '/views', __dirname + '/views/admin']);
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




// ROOT route - will redirect to Home
app.get('/', (req, res) => {
    res.redirect('/home');
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
// Change password route
const changePasswordRouter = require('./routes/changePasswordRoute');
app.use('/', changePasswordRouter);
// Home route
const homeRouter = require('./routes/homeRoute');
app.use('/', homeRouter);
// View product detail route
const productDetailRouter = require('./routes/productDetailRoute');
app.use('/', productDetailRouter);
// Cart route
const cartRouter = require('./routes/cartRoute');
app.use('/', cartRouter);
// Confirm order route
// THIS CAN ONLY BE ACCESS BY CLICKING 'NEXT' BUTTON ON CART PAGE
// DO NOT GRANT ACCESS BY TYPING URL FROM BROWSER
const confirmOrderRouter = require('./routes/confirmOrderRoute');
app.use('/', confirmOrderRouter);
// Report to admin route
const reportRouter = require('./routes/reportRoute');
app.use('/', reportRouter);
// Search route
const searchRouter = require('./routes/searchRoute');
app.use('/', searchRouter);


/////////////////////////////
// ADMIN ROUTE
/////////////////////////////
// Root ADMIN route will redirect to the first feature of ADMIN Panel
app.get('/admin', (req, res) => {
    res.redirect('/admin/orders');
})

// Admin router
// All admin routes will be: /admin/<routeName>
// Specify /admin for the first argument
const adminRouter = require('./routes/adminRoute');
app.use('/admin', adminRouter);



// Test route = For testing purpose only
/*
const Product = require('./models/product');


app.get("/test", function(req, res, next) {
    Product.findOne({}, function(err, product) {
        if (err) { return next(err); }

        const b64 = Buffer.from(product.productImage.img.data).toString('base64');
        const mimeType = 'image/' + product.productImage.img.contentType; // e.g., image/png
    
        res.send(`<img src="data:${mimeType};base64,${b64}" />`);
    });
})
*/



// START THE APP
app.listen(process.env.PORT || 5000, console.log('Server started'));