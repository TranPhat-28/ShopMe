const express = require('express');
const router = express.Router();
const Order = require('../../models/order')

// GET
const ordersView = async (req, res) => {
    const pendingOrderArr = []
    const confirmedOrderArr = []

    // Get all pending orders
    const pendingQuery = await Order.find({ status: 'pending' }).select('email').catch(e => {console.log(e.message)})

    pendingQuery.forEach(item => {
        pendingOrderArr.push(item._id)
    })

    // Get all confirmed orders
    const confirmedQuery = await Order.find({ status: 'confirmed' }).select('email').catch(e => {console.log(e.message)})

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
    Order.findOne({ _id : req.query.id}).select('-itemList.productImage').then(item => {
        //console.log(item)
        res.send(item)
    })
    .catch(e => {console.log(e.message)})
}

// POST for confirming order
const postOrder = (req, res) => {
    //console.log('Confirm order: ' + req.body.orderID)
    if (req.body.orderID == '' || req.body.orderID == null){
        res.send('<script>window.alert("Please choose a pending order to perform this action");window.location.href="/admin/orders"</script>')
    }
    else{
        //console.log('Confirm order: ' + req.body.orderID)
        Order.findOneAndUpdate({ _id: req.body.orderID, status: 'pending' }, { status: 'confirmed'}).then(order => {
            if (order == null){
                res.send('<script>window.alert("Invalid orderID or has already been confirmed");window.location.href="/admin/orders"</script>')
            }
            res.send('<script>window.alert("Successfully confirmed order");window.location.href="/admin/orders"</script>')
        })
        .catch(e => {
            console.log(e.message)
            //res.send('<script>window.alert("Something went wrong");window.location.href="/admin/orders"</script>')
        })
    }
}

module.exports = {
    ordersView,
    orderDetailView,
    postOrder
}