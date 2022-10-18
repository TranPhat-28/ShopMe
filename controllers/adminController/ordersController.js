const express = require('express');
const router = express.Router();
const Order = require('../../models/order')

// GET
const ordersView = async (req, res) => {
    const pendingOrderArr = []
    const confirmedOrderArr = []

    // Get all pending orders
    const pendingQuery = await Order.find({ status: 'pending' }).catch(e => {console.log(e.message)})

    pendingQuery.forEach(item => {
        pendingOrderArr.push(item._id)
    })

    // Get all confirmed orders
    const confirmedQuery = await Order.find({ status: 'confirmed' }).catch(e => {console.log(e.message)})

    confirmedQuery.forEach(item => {
        confirmedOrderArr.push(item._id)
    })

    // Response information
    resObj = {
        pendingOrders : pendingOrderArr,
        confirmedOrders : confirmedOrderArr,
        pendingCount : pendingOrderArr.length,
        confirmedCount : confirmedOrderArr.length,
    }
    
    res.render('orders.ejs', resObj);
}

// GET Order detail
const orderDetailView = (req, res) => {
    //console.log('Get detail view for order: ' + req.query.id)
    Order.findOne({ _id : req.query.id}).then(item => {
        console.log(item)
    })
    .catch(e => {console.log(e.message)})
}


module.exports = {
    ordersView,
    orderDetailView
}