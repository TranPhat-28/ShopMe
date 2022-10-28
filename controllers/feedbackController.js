const mongoose = require('mongoose')
const Feedback = require('../models/feedback')
const Order = require('../models/order')

const postFeedback = (req, res) => {
    const rating = req.body.rating
    const userfeedback = req.body.content
    // This is the ID of the original product
    const originalId = req.body.feedbackProductId.trim()
    // This is the ID of the product INSIDE the order -> Use to disable duplicate feedback
    const itemId = req.body.ProductOrderId.trim()
    const orderId = req.body.orderId

    if (!rating || !userfeedback || !originalId || !itemId || !orderId) {
        res.send('<script>window.alert("Missing required field(s)"); window.location.href="/myOrders"</script>')
    }
    else{
        const feedback = {
            user: req.user.email,
            feedback: userfeedback,
            star: rating
        }

        /*
        console.log("OrderID: " + orderId)
        console.log("Product ID in order" + itemId)
        console.log("Original product ID" + originalId)
        */

        Feedback.findOneAndUpdate({ reference: mongoose.Types.ObjectId(originalId) }, { $push: { feedbackList: feedback } }).then(() => {
            Order.findOneAndUpdate({ _id: orderId, "itemList._id": itemId },  { $set: { "itemList.$.feedbackStatus" : "closed" } }).then(() => {
                res.send('<script>window.alert("Your feedback has been recorded!"); window.location.href="/myOrders"</script>')  
            }).catch(err => { console.log(err.message) })
            //res.send('<script>window.alert("Your feedback has been recorded!"); window.location.href="/myOrders"</script>')
        })
        .catch(e => { console.log(e.message)} )
    }
}

module.exports = postFeedback