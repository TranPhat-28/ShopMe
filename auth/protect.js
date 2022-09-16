// Check if user has been authenticated
// Use this function to authenticated user trying to
// access protected route
const protectedRoute = (req, res, next) => {
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
// accessing login page again
const allowAccess = (req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }

    res.redirect('/test');
}

module.exports = {
    protectedRoute,
    allowAccess
};