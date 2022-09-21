// Import models
const User = require('../../models/user')
const Product = require('../../models/product');

// GET
const customersAndProductsView = async (req, res) => {
    const emailsArr = [];
    const productsArr = [];

    User.find({}, function(err, users) {
        users.forEach(function(user) {
            emailsArr.push(user.email);
        });

        // Currently I'm nesting this because
        // I have not found out how to access
        // emailsArr outside of User.find()
        Product.find({}, function(err, products) {
            products.forEach(function(product) {
                productsArr.push(product.productName);
            });
            
            // It works here
            //console.log(emailsArr, productsArr);

            res.render('customersAndProducts.ejs', {users: emailsArr,
                                                    usersCount: emailsArr.length,
                                                    products: productsArr,
                                                    productsCount: productsArr.length});
        });        
    });    
}

// Export module
module.exports = customersAndProductsView;