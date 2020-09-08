// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `suppliers`
var Ref_CategorySchema = new mongoose.Schema({
    CategoryCode: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    ProductType: {
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
module.exports = mongoose.model('Ref_Category', Ref_CategorySchema);