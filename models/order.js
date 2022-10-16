const mongoose = require('mongoose');

// Schema for storing image
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    img: {
        data: Buffer,
        contentType: String
    }   
});

// Schema for storing product
const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    productImage: {
        type: imageSchema,
        required: true
    },
});

// Define the data schema
const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    //itemList: {
    //    type: [ orderItemSchema ],
    //    required: true
    //},
    totalCost: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
