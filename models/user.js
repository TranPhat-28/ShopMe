const mongoose = require('mongoose');

// Define the data schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;