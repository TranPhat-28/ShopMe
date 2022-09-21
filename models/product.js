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

// Define the data schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    productImage: {
        type: imageSchema,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
