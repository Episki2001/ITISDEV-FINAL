// import module `mongoose`
var mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/LovelyHomes'

// defines the schema for collection `suppliers`
var ThresholdSchema = new mongoose.Schema({
    thresholdID: {
        type: Number,
        required: true
    },
    thresholdType: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    productID: {
        type: Number,
        required: true
    },
    UserID: {
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
module.exports = mongoose.model('Threshold', ThresholdSchema);