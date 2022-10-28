const Order = require('../models/order')

const myOrdersView = async (req, res) => {
    // User information
    const resObj = {};
    resObj.role = req.user.role;
    resObj.email = req.user.email;
    var pendingListId = []
    var confirmedListId = []

    // Query user's orders
    var list = await Order.find({ email: req.user.email }).select('status')
    .catch(e => console.log(e.message))

    // Separate the orders
    list.forEach(item => {
        //console.log(item._id)
        if (item.status === 'pending'){
            pendingListId.push(item._id)
        }
        else if (item.status === 'confirmed'){
            confirmedListId.push({ id: item._id, feedback: item.feedbackStatus })
        }
    })

    resObj.pendingListId = pendingListId
    resObj.confirmedListId = confirmedListId
    
    res.render('myOrders.ejs', resObj)
}

const orderDetailView = async (req, res) => {
    // User information
    const resObj = {};
    resObj.role = req.user.role;
    resObj.email = req.user.email;
    var itemList = []

    // OrderID
    var order = await Order.findOne({ _id: req.query.id }).catch(e => console.log(e.message))

    // Response information
    resObj._id = order._id
    resObj.email = order.email
    resObj.totalCost = order.totalCost
    resObj.dateCreated = order.dateCreated
    resObj.status = order.status
    resObj.itemList = itemList

    // Item list
    order.itemList.forEach(item => {
        itemList.push({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.totalPrice,
            reference: item.reference,
            feedbackStatus: item.feedbackStatus,
            b64: Buffer.from(item.productImage.img.data).toString('base64'),
            mimeType: 'image/' + item.productImage.img.contentType // e.g., image/png
        })
    })

    res.render('orderDetail.ejs', resObj)
}

module.exports = {
    myOrdersView,
    orderDetailView
}