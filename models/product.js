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
    productImage: {
        type: imageSchema,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
