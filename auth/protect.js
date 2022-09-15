const protectedRoute = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }

    console.log("Please login to continue");
    res.redirect('/login');
}

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