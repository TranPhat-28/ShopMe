const Product = require('../../models/product')
// GET
const editProductView = (req, res) => {
    res.render('editProduct.ejs');
}


// POST - update product information
const postEditProduct = (req, res) => {
    const Id = req.body.productID;
    const newName = req.body.productName;
    const newDesc = req.body.description;
    const newPrice = req.body.price;
    const newQuantity = req.body.quantity;
    const newCategory = req.body.category;

    // Missing required field(s)
    if (!Id || !newName || ! newDesc || !newPrice || !newQuantity || !newCategory){
        res.send("<script>window.alert('Missing required field(s)!'); window.location.href='/admin/editProduct'</script>");
    }
    else{
        Product.findOneAndUpdate({_id: Id}, {productName: newName, description: newDesc, price: newPrice, stockQuantity: newQuantity, category: newCategory})
        .then(() => {
            res.send("<script>window.alert('Successfully updated product!'); window.location.href='/admin/editProduct'</script>");
        })
        .catch(e => {
            console.log(e.message)
            res.send("<script>window.alert('Something went wrong!'); window.location.href='/admin/editProduct'</script>");
        })
    }
}

// SearchByName for edit
const searchEditName = async (req, res) => {
    let name = req.body.find;
    let result = await Product.findOne({ productName: name})
    .then(data => {
        if (data === null){
            res.send('No result');
        }
        else{
            res.send({
                productID: data._id,
                productName: data.productName,
                productDesc: data.description,
                productPrice: data.price,
                productQuantity: data.stockQuantity,
                productCategory: data.category
            });
        }
    })
    .catch(e => {
        //console.log(e.message);
        res.send("Something went wrong");
    });
}

// SearchByID for edit
const searchEditID = async (req, res) => {
    let ID = req.body.find;
    let result = await Product.findById(ID)
    .then(data => {
        if (data === null){
            res.send('No result');
        }
        else{
            res.send({
                productID: data._id,
                productName: data.productName,
                productDesc: data.description,
                productPrice: data.price,
                productQuantity: data.stockQuantity,
                productCategory: data.category
            });
        }
    })
    .catch(e => {
        //console.log(e.message);
        res.send("Something went wrong");
    });
}


module.exports = {
    editProductView,
    searchEditName,
    searchEditID,
    postEditProduct
}