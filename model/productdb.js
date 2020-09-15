// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('product'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `products`
var ProductSchema = new mongoose.Schema({
    productID: { type: Number, required: true },
    productName: { type: String, required: true },
    currentStock: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    supplierID: { type: String, required: true },
    categoryCode: { type: Number, required: true }
}, { collection: "products" });

const productModel = db.model('products', ProductSchema);

module.exports = productModel;