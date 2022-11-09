const Voucher = require('../../models/voucher')

// GET view all voucher
const viewVoucher = async (req, res) => {

    resObj = {}

    const voucherArr = []
    
    try{
        const vouchers = await Voucher.find()
        vouchers.forEach(voucher => {
            voucherArr.push(voucher.voucherCode)
        })
    }catch(e){
        console.log(e)
    }
    resObj.vouchers = voucherArr

    res.render('viewVoucher.ejs', resObj)
}

// GET voucher detail
const voucherDetail = async (req, res) => {
    const name = req.query.name
    var voucher = null
    try {
        voucher = await Voucher.findOne({ voucherCode: name })
    }
    catch(e) {
        console.log(e.message)
    }

    res.send(voucher)
}

// POST delete voucher
const viewVoucherPost = (req, res) => {
    const voucher = req.body.voucher
    if (voucher === ''){
        res.send('<script>window.alert("Please choose a voucher to delete"); window.location.href="/admin/viewVoucher"</script>')
    }
    else{
        // Remove user from db
        Voucher.findOneAndRemove({ _id: voucher }, function(err) {
            if (!err) {
                res.send('<script>window.alert("Voucher deleted successfully"); window.location.href="/admin/viewVoucher"</script>')
            }
            else {
                console.log(err.message);
                res.send('<script>window.alert("Something went wrong!"); window.location.href="/admin/viewVoucher"</script>');
            }
        });
    }
}

module.exports = {
    viewVoucher,
    voucherDetail,
    viewVoucherPost
}