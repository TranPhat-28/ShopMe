// Model
const User = require('../models/user');

// GET ChangeInfo
const changeInfoView = (req, res) => {
    // Check if logged in or not
    res.render('changeInfo.ejs', { phoneNumber: req.user.phoneNumber, address: req.user.address });
}

const postChangeInfo = (req, res) => {
    const email = req.user.email;
    const newPhoneNumber = req.body.phoneNumber;
    const newAddress = req.body.address;
    //console.log("Change info for user: " + req.user.email);
    //console.log(req.body.phoneNumber + req.body.address);

    //filterObj, updateObj
    User.findOneAndUpdate({email: email}, {phoneNumber: newPhoneNumber, address: newAddress}, (err, updated) => {
        if (err) {
            console.log(err.message);
        }
        else{
            res.send('<script>window.alert("Information updated successfully!"); window.location.href="/home";</script>')
        }
    });

}

// Export module
module.exports = {
    changeInfoView,
    postChangeInfo
};