const Product = require('../models/product')

const searchView = async (req, res) => {
    //Response obj
    var resObj = {};
    // Arr
    let result = []

    // Check if logged in or not
    if (!req.user){
        resObj.role = null;
    }
    else{
        resObj.role = req.user.role;
        resObj.email = req.user.email;
    }


    // Query param
    let name = req.query.name
    let cateOnly = req.query.cateOnly
    let min = parseInt(req.query.min)
    let max = parseInt(req.query.max)
    let category = req.query.category
    let paging = req.query.page

    // If going from category from homepage:
    if (cateOnly){
        resObj.validName = 'YES'
        // Page number
        const page = req.query.page

        // Show 10 per page
        let resultPromise = await Product.find({category: cateOnly}).skip((page - 1) * 10).limit(10).catch(e => {
            console.log(e.message)
        })

        
        resultPromise.forEach(function(item) {
            // For handling image data
            const b64 = Buffer.from(item.productImage.img.data).toString('base64');
            const mimeType = 'image/' + item.productImage.img.contentType; // e.g., image/png
    
    
            result.push({
                productName: item.productName,
                productPrice: item.price,
                productId: item._id,
                mimeType: mimeType,
                base64: b64
            });
        });

        // Add result array to response Object
        resObj.result = result;

        res.render('search.ejs', resObj)
    }
    // Check if user has input productName to find
    else if (name == null || name == '') {
        resObj.validName = 'NO'
        res.render('search.ejs', resObj)
    }
    // Input OK
    else{
        resObj.validName = 'YES'
        // Query products whose name contains name param
        let queryObj = {
            productName: { "$regex": name, "$options": "i" }
        }
        // If min and max are both set
        if (min && max){
            queryObj.price = { $gte :  min, $lte: max }
        }
        //If only min OR max is set
        else if (min){
            queryObj.price = { $gte :  min}
        }
        else if (max){
            queryObj.price = { $lte :  max}
        }
        // If category is set
        if (category) {
            queryObj.category = category
        }
        // Page number
        const page = req.query.page
        

        // Show 10 per page
        let resultPromise = await Product.find(queryObj).skip((page - 1) * 10).limit(10).catch(e => {
            console.log(e.message)
        })

        
        resultPromise.forEach(function(item) {
            // For handling image data
            const b64 = Buffer.from(item.productImage.img.data).toString('base64');
            const mimeType = 'image/' + item.productImage.img.contentType; // e.g., image/png
    
    
            result.push({
                productName: item.productName,
                productPrice: item.price,
                productId: item._id,
                mimeType: mimeType,
                base64: b64
            });
        });

        // Add result array to response Object
        resObj.result = result;

        res.render('search.ejs', resObj)
    }
}

module.exports = searchView