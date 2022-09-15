const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Function to render Register page
const registerView = (req, res) => {
    res.render('register.ejs');
};

// Function to handle POST to Register
// Use Async function
const postRegister = async (req, res) => {
    try{
        // Get all the input from user and check if any fields is empty
        const email = req.body.email;
        const password = req.body.password;
        const confirm = req.body.confirm;
        const phoneNumber = req.body.phone;
        const address = req.body.address;
        


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
                    bcrypt.hash(password, 10).then(hash => {

                        // Get all the input from user and create a new User
                        const newUser = new User({
                        email: email,
                        password: hash,
                        phoneNumber: phoneNumber,
                        address: address
                        });

                        // Save to the database
                        newUser.save()
                        .then(() => {
                            console.log('Registration success! Redirecting to login...');
                            res.send("<script>alert('Registration success! Redirect to login now'); window.location.href='/login'; </script>");
                        })
                    });
                }
            });        
        }
    }
    catch(e){
        console.log(e);
    }
};

// Export the function for route file to use
module.exports = {
    registerView,
    postRegister
};