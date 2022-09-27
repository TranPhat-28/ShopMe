const Cart = require('../models/cart');

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
    
    resObj.total = req.body.total
    if (req.body.voucher !== ''){
        resObj.voucher = req.body.voucher
    }
    else{
        resObj.voucher = 'None'
    }
    resObj.itemList = resList
    res.render('confirmOrder.ejs', resObj)
}

module.exports = confirmOrder;