const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');



// Tell router how to handle request
// Just like app.get or app.post in index.js
// GET Login
router.get('/login', (req, res) => {
   res.render('login.ejs');
});



// GET Register
router.get('/register', (req, res) => {
    res.render('register.ejs');
});


// POST Login route
router.post('/login', (req, res) => {
    console.log(req.body.email + req.body.password);
});



// POST Register route
// Use async function
router.post('/register', async (req, res) => {
    try{
        // Get all the input from user and check if any fields is empty
        const email = req.body.email;
        const password = req.body.password;
        const confirm = req.body.confirm;
        const phoneNumber = req.body.phone;
        const address = req.body.address;
        const hashedPass = await bcrypt.hash(password, 10);



        // Check for missing field(s)
        if (!email || !password || !confirm || !phoneNumber || !address){
            console.log("Missing required field(s)");
            res.send("<script>alert('Missing required field(s)'); window.location.href='/register'; </script>");
        }
        // Password and confirm must match
        else if (password !== confirm){
            console.log("Password does not match");
            res.send("<script>alert('Password does not match'); window.location.href='/register'; </script>");
        }
        else{
            // Check for duplicated email
            User.exists({ email: email }).then((user) => {
                if(user){
                    console.log("This email already existed!");
                    res.send("<script>alert('This email already existed!'); window.location.href='/register'; </script>");
                }
                else{
                    // Hash the provided password
                    console.log(hashedPass);

                    // Get all the input from user and create a new User
                    const newUser = new User({
                        email: email,
                        password: hashedPass,
                        phoneNumber: phoneNumber,
                        address: address
                    });

                    // Save to the database
                    newUser.save()
                    .then(() => {
                        console.log('Registration success! Redirecting to login...');
                        res.send("<script>alert('Registration success! Redirect to login now'); window.location.href='/login'; </script>");
                    })
                    .catch(e => console.log(e));
                }
            });        
        }
    }
    catch(e){
        console.log(e);
    }
});



// Export the router
module.exports = router;