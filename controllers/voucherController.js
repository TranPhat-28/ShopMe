const Voucher = require('../models/voucher')

const voucherView = async (req, res) => {
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

    var nonExpires = null
    var expires = null

    try{
        nonExpires = await Voucher.find({expirationDate: null})
        expires = await Voucher.find({ expirationDate: { $ne: null } })
    }
    catch(err) {
        console.log(err.message)
    }

    resObj.nonExpires = nonExpires
    resObj.expires = expires


    res.render('voucher.ejs', resObj)
}

module.exports = voucherView