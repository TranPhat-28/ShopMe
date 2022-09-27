const mongoose = require('mongoose');

// Define schema
const ReportSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "unread"
    }
})

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;