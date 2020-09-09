// import module `mongoose`
var mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/LovelyHomes'

// defines the schema for collection `suppliers`
var ProductSchema = new mongoose.Schema({
    productID: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    currentStock: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    supplierID: {
        type: String,
        required: true
    },
    categoryCode: {
        type: Number,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Product', ProductSchema);