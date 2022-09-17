// GET Home
const homeView = (req, res) => {
    // Check if logged in or not
    if (!req.user){
        //console.log('NOT LOGGED IN YET');
        res.render('home.ejs', { email: null });
    }
    else{
        //console.log(req.user.email);
        res.render('home.ejs', { email: req.user.email });
    }
}

// Export module
module.exports = homeView;