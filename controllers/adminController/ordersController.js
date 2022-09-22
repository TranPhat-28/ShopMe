const express = require('express');
const router = express.Router();


// GET
const ordersView = (req, res) => {
    res.render('orders.ejs');
}

// POST


module.exports = ordersView;