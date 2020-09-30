// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('product'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `products`
var ProductSchema = new mongoose.Schema({
    productID: { type: Number, required: true },
    productName: { type: String, required: true },
    currentStock: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    supplierID: { type: Number, required: true },
    categoryCode: { type: Number, required: true }
}, { collection: "products" });

ProductSchema.methods.recordNewProduct = async function() {
    var result = await productModel.create(this);
    return result;
};

ProductSchema.methods.recordEditProduct = async function() {
    console.log('inside mehtod')
    var result = productModel.findOneAndUpdate({ productID: this.productID }, { sellingPrice: this.sellingPrice, purchasePrice: this.purchasePrice });
    return result;
};
const productModel = db.model('products', ProductSchema);

module.exports = productModel;