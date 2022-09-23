const bcrypt = require('bcrypt');
const User = require('../models/user');

// GET changepassword
const changePasswordView = (req, res) => {
    res.render('changePassword.ejs');
}
// POST changepassword
const postChangePassword = (req, res) => {
    const email = req.user.email;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    const confirm = req.body.confirm;

    //console.log("Change password for" + email);
    //console.log(oldPass + newPass + confirm);

    if (!oldPass || !newPass || !confirm){
        res.send('<script>window.alert("Missing required field(s)"); window.location.href="/changePassword"</script>');
    }
    else if (newPass !== confirm){
        res.send('<script>window.alert("Password must match!"); window.location.href="/changePassword"</script>');
    }
    else{
        User.findOne({email: email}, function(err,obj) {
            if (err) {
                console.log(err.message);
            }
            else{
                const oldHashPass = obj.password;
                bcrypt.compare(oldPass, oldHashPass, function(err, result) {
                    if (err) {
                        console.log(err.message);
                    }
                    // Old password is correct
                    else if (result === true) {
                        // Hash new password
                        bcrypt.hash(confirm, 10).then(hash => {
                            // Find and update
                            User.findOneAndUpdate({email: email}, {password: hash}, (err, updated) => {
                                if (err) {
                                    console.log(err.message);
                                }
                                else{
                                    res.send('<script>window.alert("Password updated successfully!"); window.location.href="/home";</script>')
                                }
                            });
                        });
                    }
                    // Old password is wrong
                    else{
                        res.send('<script>window.alert("Incorrect old password"); window.location.href="/changePassword"</script>');
                    }
                })
            }
        });

        //console.log(user);

        //const oldHashPass = 


        //bcrypt.compare(oldPass, hash, function(err, result) {
            // result == true
        //});
    }
}

module.exports = {
    changePasswordView,
    postChangePassword
}