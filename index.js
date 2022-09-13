const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Set view engine
app.set('view engine', 'ejs');
// URLEncoded
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

// Root route - will redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Import the routers
const loginRouter = require('./routes/login');
// Tell the app to use the router
// 1st param: root dir
// 2nd param: which router to handle the request
app.use('/', loginRouter);

// Start the app
app.listen(process.env.PORT || 5000, console.log('Server started'));