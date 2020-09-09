// import module `mongoose`
var mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/LovelyHomes'

// defines the schema for collection `suppliers`
var SupplierSchema = new mongoose.Schema({
    supplierID: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Supplier', SupplierSchema);