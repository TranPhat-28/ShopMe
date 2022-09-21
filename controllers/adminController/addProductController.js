// Import product model
const Product = require('../../models/product');
// Multer and fs for handling file
const multer = require("multer");






// GET addProduct View
const addProductView = (req, res) => {
    res.render('addProduct.ejs');
}

// Uploading image to mongoDB
const postAddProduct = (req, res, next) => {
    // Check for required fields
    const productName = req.body.productName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    if (!productName || !description || !price || !quantity || !req.file){
        res.send("<script>alert('Missing required field(s)'); window.location.href='/admin/addProduct'; </script>");
    }
    else{
        //console.log(req.file);
        try{
            const imgName = req.file.originalname;
            const imgData = req.file.buffer;
            const imgType = req.file.mimetype;

            // Get all the input from user and create a new Product
            const newProduct = new Product({
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                stockQuantity: req.body.quantity,
                sold: 0,
                productImage: {
                    name: imgName,
                    img: {
                        data: imgData,
                        contentType: imgType
                    }
                }
            });
        
            // Save to the database
            newProduct.save()
            .then(() => {
                res.send("<script>alert('Successfully added a new product'); window.location.href='/admin/addProduct'; </script>");
            })
            
        }
        catch(e){
            console.log(e);
        }
    }
};


// Export module
module.exports = {
    addProductView,
    postAddProduct
};