const Cart = require('../models/cart');
const Product = require('../models/product');

// GET
const cartView = async (req, res) => {
    // User information
    const resObj = {};
    resObj.role = req.user.role;
    resObj.email = req.user.email;
    const resList = [];
    

    // Query the corresponding cart
    const myCart = await Cart.findOne({ email: req.user.email }).catch(err => {
        console.log(err.message);
    });

    // Check if the product is still active
    // (Has not been removed by admin)
    var i = 0;
    for (i; i < myCart.itemList.length; i++)
    {
        var itemOriginal = myCart.itemList[i].reference;
        let result = await Product.exists({ _id: itemOriginal });
        if (result === null) {
            break;
        }
    }

    if (i === myCart.itemList.length ){
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
    
        resObj.itemList = resList;
        resObj.total = myCart.total;
        res.render('cart.ejs', resObj);
    }
    else{
        // Product[i] have been removed, perform update cart
        let invalid = myCart.itemList[i]._id
        let tmpPrice = myCart.itemList[i].price
        let tmpQuantity = myCart.itemList[i].quantity
        let tmpCost = tmpPrice * tmpQuantity
        
        
        Cart.updateOne({ email: req.user.email }, { $pull: {itemList: {_id: invalid}}, $inc: {total: -tmpCost}}, (err, updated) => {
            if (err) {
                console.log(err.message)
            }
            else{
                res.send('<script>window.alert("Some product(s) in your cart has been removed by admin. Your cart will be updated automatically"); window.location.href="/cart"</script>')
            }
        })
    }
}

// POST - Handling Add to cart option
const postAddToCart = async (req, res) => {
    const productId = req.body.productId;
    const email = req.user.email;
    const orderQuantity = req.body.quantity;


    // First check for the validity of the request
    // Quantity must not exceed stock
    Product.findById(productId, (err, product) => {
        if(err){
            console.log(err);
        }
        else{
            // If order more than stock OR order invalid number of product
            if (product.stockQuantity < orderQuantity || orderQuantity < 1){
                res.status(400);
                res.send("Order quantity must be less than stock quantity");
            }
            else{
                // New object for pushing
                const newItem = {
                    name: product.productName,
                    price: product.price,
                    quantity: orderQuantity,
                    reference: product._id,
                    productImage: product.productImage
                };
                // New cost to update to cart
                var cost = product.price * orderQuantity

                // Input valid, add to cart
                Cart.findOneAndUpdate({email: email}, { $push: {itemList: newItem}, $inc: {total: cost}}, (err, updated) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else{
                        res.send('Success');
                    }
                });
            }
        }
    })
}

// POST Handling remove from cart
const postRemoveFromCart = async (req, res) => {
    const productId = req.body.productId;
    const email = req.user.email;
    
    const myCart = await Cart.findOne({email: email}).catch(e => { console.log(e.message)})
    myCart.itemList.forEach(item => {
        if (item._id == productId) {
            let cost = item.price * item.quantity
            
            Cart.updateOne({ email: email }, { $pull: {itemList: {_id: productId}}, $inc: {total: -cost}}, (err, updated) => {
                if (err) {
                    console.log(err.message)
                }
                else{
                    res.send('Success')
                }
            })
        }
    })
}


module.exports = {
    cartView,
    postAddToCart,
    postRemoveFromCart
}