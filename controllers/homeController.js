const Product = require('../models/product');

// GET Home
const homeView = async (req, res) => {
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

    // New arrivals
    const newArrivalsArr = [];
    // Best sellers
    const bestSellersArr = [];
    
    // To sort in mongoose
    // -1 : latest(newest) to oldest OR highest to lowest
    // NEW ARRIVALS
    const newArrival = await Product.find({}).sort([['dateAdded', -1]]).limit(7).catch(err => {
        // handle error here
        console.log('Cannot fetch data: ' + err);
        res.render('customersAndProducts.ejs');
    });
    newArrival.forEach(function(item) {
        // For handling image data
        const b64 = Buffer.from(item.productImage.img.data).toString('base64');
        const mimeType = 'image/' + item.productImage.img.contentType; // e.g., image/png


        newArrivalsArr.push({
            productName: item.productName,
            productPrice: item.price,
            productId: item._id,
            mimeType: mimeType,
            base64: b64
        });
    });

    // BEST SELLERS
    const bestSeller = await Product.find({}).sort([['sold', -1]]).limit(6).catch(err => {
        // handle error here
        console.log('Cannot fetch data: ' + err);
        res.render('customersAndProducts.ejs');
    });
    bestSeller.forEach(function(best) {
        // For handling image data
        const b64 = Buffer.from(best.productImage.img.data).toString('base64');
        const mimeType = 'image/' + best.productImage.img.contentType; // e.g., image/png


        bestSellersArr.push({
            productName: best.productName,
            productPrice: best.price,
            productId: best._id,
            mimeType: mimeType,
            base64: b64
        });
    });

    /*console.log(newArrivals);
    newArrivalsArr.forEach((item) => {
        Object.assign(resObj, {productName: item.productName,
                                productPrice: item.price});
    });*/

    resObj.newArrivals = newArrivalsArr;
    resObj.bestSellers = bestSellersArr;

    // Return response
    res.render('home.ejs', resObj);
}

// Export module
module.exports = homeView;