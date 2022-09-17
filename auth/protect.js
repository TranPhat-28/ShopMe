// Check if user has been authenticated
// Use this function to authenticated user trying to
// access protected route
module.exports = protectedRoute = (req, res, next) => {
    // If user has been authenticated, call next()
    if (req.isAuthenticated()){
        return next();
    }
    // If user has NOT been authenticated, redirect to login
    console.log("Please login to continue");
    res.redirect('/login');
}


// The opposite of the above
// Use this to prevent already authenticated user from 
// accessing login or register page again
// If already logged in, redirect to home page
module.exports = allowAccess = (req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }
    res.send("<script>alert('You have already logged in! Please log out first'); window.location.href='/home'; </script>");
    //res.redirect('/test');
}