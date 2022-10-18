const Cart = require('../models/cart');
const Product = require('../models/product')
const Order = require('../models/order')

// Render view
const confirmOrder = async (req, res) => {
    // User information
    const resObj = {};
    resObj.role = req.user.role;
    resObj.email = req.user.email;
    const resList = [];
    

    // Query the corresponding cart
    const myCart = await Cart.findOne({ email: req.user.email }).catch(err => {
        console.log(err.message);
    });
       
    // All product is still active
    myCart.itemList.forEach((item) => {
        const b64 = Buffer.from(item.productImage.img.data).toString('base64');
        const mimeType = 'image/' + item.productImage.img.contentType; // e.g., image/png
    
        // Push the information to the array
        resList.push({
            productId: item._id,
            productName: item.name,
            productPrice: item.price,
            productQuantity: item.quantity,
            mimeType: mimeType,
            base64: b64
        });
    })
    
    resObj.total = myCart.total

    if (req.body.voucher !== ''){
        resObj.voucher = req.body.voucher
    }
    else{
        resObj.voucher = 'None'
    }
    resObj.itemList = resList
    res.render('confirmOrder.ejs', resObj)
}

// Validate the amount of product in stock before placing order
// If valid, proceed to place order
const checkOrder = async (req, res) => {
    // User information
    const resObj = {};
    resObj.role = req.user.role;
    resObj.email = req.user.email;
    const itemList = [];
    var totalCost = 0;
    

    // Query the corresponding cart
    // And get all item information
    await Cart.findOne({ email: req.user.email })
    .then(myCart => {
        myCart.itemList.forEach( item => {
            itemList.push(item)
        })

        totalCost = myCart.total
    })
    .catch(err => {
        console.log(err.message);
    });


    // Perform check
    var i = 0
    var invalidItem = ''
    for (i; i < itemList.length; i++){
        let product = await Product.findById(itemList[i].reference).select('stockQuantity').catch(e => { console.log(e.message) })
        if (product.stockQuantity < itemList[i].quantity){ 
            invalidItem = itemList[i].name
            break 
        }
    }

    if (i < itemList.length){
        //console.log('Invalid item: ' + invalidItem)
        res.send('<script>window.alert("Product ' + invalidItem + ' is lower in stock than in your order. Please check your cart");window.location.href="/cart"</script>')
    }
    else{
        var newList = []

        itemList.forEach(item => {
            // New list for newOrder query
            newList.push({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                totalPrice: (item.quantity * item.price),
                reference: item.reference,
                productImage: {
                    name: item.productImage.name,
                    img: item.productImage.img
                }
            })

            // Decrease the amount of product ordered
            Product.findOneAndUpdate({_id: item.reference}, { $inc: { stockQuantity: -item.quantity, sold: item.quantity} }).catch(e => {console.log(e.message)})
        })

        
        const newOrder = new Order({
            email: req.user.email,
            itemList: newList,
            totalCost: totalCost,
            status: 'pending'
        })

        newOrder.save()
        .then(() => {
            //console.log('Order created')
            res.send('<script>window.alert("Your order has been successfully created");window.location.href="/cart"</script>')

            // Empty the cart
            Cart.findOneAndUpdate({email: req.user.email}, {itemList: [], total: 0}).catch(e => {
                console.log(e.message)
            })
        })
        .catch(e => {
            console.log(e.message)
            res.send('<script>window.alert("Something went wrong, please try again later");window.location.href="/cart"</script>')
        })
    }
}

module.exports = {
    confirmOrder,
    checkOrder
}