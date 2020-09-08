// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `suppliers`
var DeliverySchema = new mongoose.Schema({
    deliveryID: {
        type: Number,
        required: true
    },
    number_Of_Units_Delivered: {
        type: Number,
        required: true
    },
    number_Of_Damaged: {
        type: Number,
        required: true
    },
    dateDelivered: {
        type: Date,
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
module.exports = mongoose.model('Delivery', DeliverySchema);