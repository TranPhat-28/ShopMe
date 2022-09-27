// Require model
const Report = require('../../models/report');

const userReportView = async (req, res) => {
    const arr = [];

    const reportList = await Report.find({}).sort([['date', -1]]).catch((err) => {
        if (err) { console.log(err.message) }
    })

    reportList.forEach(item => {
        arr.push({
            id: item._id,
            status: item.status
        })
    })

    //console.log(arr);

    res.render('userReport.ejs', { reportList: arr });
}


// For AJAX get reportDetail
const reportDetailView = (req, res) => {
    Report.findOneAndUpdate({ _id: req.query.id }, {$set: { status : "read" }}, { new: true }, (error, doc) => {
        if (error) { console.log( err.message )}
        res.send(doc);
    });
}


// Delete report
const postUserReport = (req, res) => {
    //console.log("Delete report: " + req.body.deleteId);
    // Handle DELETE report
    if (req.body.deleteId){
        const id = req.body.deleteId.trim();
        //console.log("Remove report: " + id);

        Report.findOneAndRemove({_id: id}, req.body, function(err,data)
        {
            if(!err){
                res.send('<script>window.alert("Successfully deleted report"); window.location.href="report"</script>');
            }
            else{
                console.log(err.message);
                res.send('<script>window.alert("Something went wrong!"); window.location.href="report"</script>');
            }
        });
    }else{
        res.send('<script>window.alert("Please choose a report to delete"); window.location.href="report"</script>');
    }
}

module.exports = {
    userReportView,
    postUserReport,
    reportDetailView
}