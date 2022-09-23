// Import model
const Product = require('../models/product');

// GET
const productDetailView = async (req, res) => {
    //Response obj
    var resObj = {};

    // Check if logged in or not
    if (!req.user){
        resObj.role = null;
    }
    else{
        resObj.role = req.user.role;
        resObj.email = req.user.email;
    }

    // Find the product
    var product = await Product.findById(req.query.id).catch(err => {
        console.log('Error fetching product');
        console.log(err);
    })

    // Handle the image
    const b64 = Buffer.from(product.productImage.img.data).toString('base64');
    const mimeType = 'image/' + product.productImage.img.contentType; // e.g., image/png

    // Send the information
    resObj.productId = product._id;
    resObj.productName = product.productName;
    resObj.productDescription = product.description;
    resObj.productPrice = product.price;
    resObj.productStock = product.stockQuantity;
    resObj.productSold = product.sold;
    resObj.productCategory = product.category;
    resObj.mimeType = mimeType;
    resObj.base64 = b64;
    
    res.render('productDetail.ejs', resObj);
}

// POST

// Export
module.exports = productDetailView;