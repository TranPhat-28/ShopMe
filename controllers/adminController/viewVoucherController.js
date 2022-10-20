// GET view all voucher
const viewVoucher = (req, res) => {
    res.render('viewVoucher.ejs')
}

// GET voucher detail

// POST delete voucher
const viewVoucherPost = (req, res) => {
    console.log('Delete voucher')
}

module.exports = {
    viewVoucher,
    viewVoucherPost
}