// Require model
const Report = require('../models/report');

// GET
const reportView = (req, res) => {
    res.render('report.ejs', { role: req.user.role, email: req.user.email });
}

// POST - Receive report from user
const postReport = (req, res) => {
    const email = req.user.email;
    const title = req.body.title;
    const detail = req.body.detail;

    if (!email || !title || !detail){
        res.send('<script>window.alert("Missing required field(s)"); window.location.href="/report"</script>');
    }
    else{
        newReport = new Report({
            user: email,
            title: title,
            detail: detail
        })
        newReport.save().then(() => {
            res.send("<script>alert('Your report has been submitted'); window.location.href='/home'; </script>");
        }).catch((e) => {
            console.log(e.message);
        })
    }
}

module.exports = {
    reportView,
    postReport
}