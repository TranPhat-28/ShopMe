const Voucher = require('../../models/voucher')

// GET addVoucher view
const viewAddVoucher = (req, res) => {
    res.render('addVoucher.ejs')
}

// POST add new voucher to db
const addVoucherPost = (req, res) => {
    const voucherCode = req.body.voucherCode
    var expirationDate = req.body.expirationDate
    const discountPercent = req.body.discountPercent
    const noExpire = req.body.noExpire

    if (!voucherCode || (!expirationDate && !noExpire) || !discountPercent){
        res.send('<script>window.alert("Missing required field(s)"); window.location.href="/admin/addVoucher"</script>')
    }
    else{
        // No expiration date
        if (noExpire === 'on'){
            expirationDate = null
        }
    
        const newVoucher = new Voucher({
            voucherCode: voucherCode,
            expirationDate: expirationDate,
            discountPercent: discountPercent,
            users: []
        })

        newVoucher.save().then(() => {
            res.send('<script>window.alert("Successfully added a new voucher"); window.location.href="/admin/viewVoucher"</script>')
        })
        .catch(e => { console.log(e.message) })
    }
}

module.exports = {
    viewAddVoucher,
    addVoucherPost
}