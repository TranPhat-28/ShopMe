// GET ChangeInfo
const changeInfoView = (req, res) => {
    // Check if logged in or not
    if (!req.user){
        //console.log('NOT LOGGED IN YET');
        res.render('changeInfo.ejs');
    }
    else{
        //console.log(req.user.email);
        res.render('changeInfo.ejs');
    }
}

// Export module
module.exports = changeInfoView;