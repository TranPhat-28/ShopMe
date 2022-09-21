// Import models
const User = require('../../models/user')
const Product = require('../../models/product');

// GET
const customersAndProductsView = async (req, res) => {
    const emailsArr = [];
    const productsArr = [];

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
    });

    res.render('customersAndProducts.ejs', {users: emailsArr,
                                            usersCount: emailsArr.length,
                                            products: productsArr,
                                            productsCount: productsArr.length});
}

// Export module
module.exports = customersAndProductsView;