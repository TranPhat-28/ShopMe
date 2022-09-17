// The opposite of protectedRoute
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