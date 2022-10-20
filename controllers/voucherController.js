const voucherView = (req, res) => {
    // User information
    //Response obj
    var resObj = {};

    // Check if logged in or not
    if (!req.user){
        resObj.role = null;
    }
    else{
        resObj.role = req.user.role;
        resObj.email = req.user.email;
    }

    res.render('voucher.ejs', resObj)
}

module.exports = voucherView