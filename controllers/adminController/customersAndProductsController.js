// Import models
const User = require('../../models/user')
const Product = require('../../models/product');
const Cart = require('../../models/cart');
const mongoose = require('mongoose');

// GET
const customersAndProductsView = async (req, res) => {
    const emailsArr = [];
    const productsArr = [];
    const productIdArr = [];

    const users = await User.find({}).catch(err => {
        // handle error here
        console.log('Cannot fetch data: ' + err);
        res.render('customersAndProducts.ejs');
    });

    const products = await Product.find({}).catch(err => {
        // handle error here
        console.log('Cannot fetch data: ' + err);
        res.render('customersAndProducts.ejs');
    });

    //Your stuff
    users.forEach(function(user) {
        emailsArr.push(user.email);
    });

    products.forEach(function(product) {
        productsArr.push(product.productName);
        productIdArr.push(product._id);
    });

    res.render('customersAndProducts.ejs', {users: emailsArr,
                                            usersCount: emailsArr.length,
                                            products: productsArr,
                                            productsCount: productsArr.length,
                                            productId: productIdArr});
}


// Ajax GET product detail
const productDetailView = async (req, res) => {
    // Query exclude productImage field
    const product = await Product.findById(req.query.id).catch(e => {
        console.log('Something went wrong');
    });

    // Handle the image
    const b64 = Buffer.from(product.productImage.img.data).toString('base64');
    const mimeType = 'image/' + product.productImage.img.contentType; // e.g., image/png

    res.send({product: product, b64: b64, mimeType: mimeType});
}

// Ajax GET user detail
const userDetailView = async (req, res) => {
    const user = await User.findOne({email: req.query.email}).catch(e => {
        console.log('Something went wrong');
    });
    res.send(user);
}




// POST
// Will handle delete user and delete product
const postCustomersAndProducts = (req, res) => {
    // Handle DELETE product
    if (req.body.productId){
        const id = req.body.productId.trim();
        console.log("Remove product: " + id);

        Product.findOneAndRemove({_id: id}, req.body, function(err,data)
        {
            if(!err){
                res.send('<script>window.alert("Successfully removed selected product"); window.location.href="customersAndProducts"</script>');
            }
            else{
                console.log(err.message);
                res.send('<script>window.alert("Something went wrong!"); window.location.href="customersAndProducts"</script>');
            }
        });
    }
    // Handle DELETE user
    else if(req.body.email){
        const email = req.body.email.trim();
        console.log("Remove user: " + email);

        // Remove user from db
        User.findOneAndRemove({ email: email }, function(err) {
            if (!err) {
                // No error, remove corresponding cart
                Cart.findOneAndRemove({ email: email }, function(err) {
                    if (!err) {
                    // Success
                    res.send('<script>window.alert("Successfully removed selected user"); window.location.href="customersAndProducts"</script>');
                    }else{
                        console.log(err.message);
                        res.send('<script>window.alert("Something went wrong!"); window.location.href="customersAndProducts"</script>');
                    }
                })
            }
            else {
                console.log(err.message);
                res.send('<script>window.alert("Something went wrong!"); window.location.href="customersAndProducts"</script>');
            }
        });
    }
    else{
        res.send('<script>window.alert("Please specify a user or product to perform this action"); window.location.href="customersAndProducts"</script>');
    }
}


// Export module
module.exports = {
    customersAndProductsView,
    productDetailView,
    userDetailView,
    postCustomersAndProducts
};