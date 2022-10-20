const mongoose = require('mongoose');

// Define schema
const VoucherSchema = new mongoose.Schema({
    voucherCode: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    users: {
        type: [ String ],
        required: true
    }
})

const Voucher = mongoose.model('Voucher', VoucherSchema);
module.exports = Voucher;