// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `suppliers`
var SalesSchema = new mongoose.Schema({
    salesID: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    dateSold: {
        type: Number,
        required: true
    },
    productID: {
        type: Number,
        required: true
    },
    userID: {
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
module.exports = mongoose.model('Sales', SalesSchema);