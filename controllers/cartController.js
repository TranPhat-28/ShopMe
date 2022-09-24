const Cart = require('../models/cart');
const Product = require('../models/product');

// GET
const cartView = (req, res) => {
    // User information
    const resObj = {};
    resObj.role = req.user.role;
    resObj.email = req.user.email;

    res.render('cart.ejs', resObj);
}
// POST
const postCart = (req, res) => {

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
                    reference: product._id
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


module.exports = {
    cartView,
    postCart,
    postAddToCart
}