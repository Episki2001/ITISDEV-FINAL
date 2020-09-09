// import module `mongoose`
var mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/LovelyHomes'

// defines the schema for collection `suppliers`
var DiscountSchema = new mongoose.Schema({
    discountID: {
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
    discount: {
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
module.exports = mongoose.model('Discount', DiscountSchema);