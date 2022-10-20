const Voucher = require('../../models/voucher')

// GET addVoucher view
const viewAddVoucher = (req, res) => {
    res.render('addVoucher.ejs')
}

// POST add new voucher to db
const addVoucherPost = (req, res) => {
    const voucherCode = req.body.voucherCode
    const expirationDate = req.body.expirationDate
    const discountPercent = req.body.discountPercent

    if (!voucherCode || !expirationDate || !discountPercent){
        res.send('<script>window.alert("Missing required field(s)"); window.location.href="/admin/addVoucher"</script>')
    }
    else{
        //console.log(expirationDate - Date.now())
        console.log(Date.now())
        /*
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
        */
    }
}

module.exports = {
    viewAddVoucher,
    addVoucherPost
}