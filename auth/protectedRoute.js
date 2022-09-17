// Check if user has been authenticated
// Use this function to prevent UNauthenticated user 
// from trying to access protected route
module.exports = protectedRoute = (req, res, next) => {
    // If user has been authenticated, call next()
    if (req.isAuthenticated()){
        return next();
    }
    // If user has NOT been authenticated, redirect to login
    //console.log("Please login to continue");
    res.send("<script>alert('Please log in first'); window.location.href='/login'; </script>");
    //res.redirect('/login');
}