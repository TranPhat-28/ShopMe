// Check if user is ADMIN
// Use this function to prevent user 
// from trying to access ADMIN route
module.exports = adminProtected = (req, res, next) => {
    // If user has been authenticated, call next()
    if (req.isAuthenticated() && (req.user.role === 'admin')){
        return next();
    }
    // If user has NOT been authenticated, redirect to login
    //console.log("Please login to continue");
    res.send("<script>alert('RESTRICTED!!!'); window.location.href='/home'; </script>");
    //res.redirect('/login');
}