// GET addProduct View
const addProductView = (req, res) => {
    res.render('addProduct.ejs');
}

// POST to addProduct: add new product to database
const postAddProduct = (req, res) => {
    console.log('Add new product to database - Implemeting...');
}

// Export module
module.exports = {
    addProductView,
    postAddProduct
};