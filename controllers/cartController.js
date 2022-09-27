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
        res.render('cart.ejs', resObj);
    }
    else{
        // Some products have been removed, perform update cart
        myCart.itemList.forEach(async item => {
            // Check for item
            let result = await Product.exists({ _id: myCart.itemList[i].reference });
            // If invalid item
            if (result === null) {
                Cart.updateOne({ email: req.user.email }, { $pull: {itemList: {_id: myCart.itemList[i]._id}}}, (err, updated) => {
                    if (err) {
                        console.log(err.message)
                    }
                    else{
                        //
                    }
                })
            }
        })
        // Send notification to user
        res.send('<script>window.alert("Some product(s) in your cart has been removed by admin. Your cart will be updated automatically"); window.location.href="/cart"</script>')
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

                // Input valid, add to cart
                Cart.findOneAndUpdate({email: email}, { $push: {itemList: newItem}}, (err, updated) => {
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
const postRemoveFromCart = (req, res) => {
    const productId = req.body.productId;
    const email = req.user.email;
    
    
    Cart.updateOne({ email: email }, { $pull: {itemList: {_id: productId}}}, (err, updated) => {
        if (err) {
            console.log(err.message)
        }
        else{
            res.send('Success')
        }
    })
}


module.exports = {
    cartView,
    postAddToCart,
    postRemoveFromCart
}