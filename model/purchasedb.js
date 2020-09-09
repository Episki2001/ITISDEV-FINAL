// import module `mongoose`
var mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/animosis'

// defines the schema for collection `suppliers`
var PurchaseSchema = new mongoose.Schema({
    purchaseID: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    datePurchased: {
        type: Date,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    managerID: {
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
module.exports = mongoose.model('Purchase', PurchaseSchema);