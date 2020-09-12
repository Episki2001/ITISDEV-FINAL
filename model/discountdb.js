// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('discount'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `discounts`
var DiscountSchema = new mongoose.Schema({
    discountID: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    dateSold: { type: Number, required: true },
    productID: { type: Number, required: true },
    userID: { type: Number, required: true }
}, {collection: "Discount"});

const discountModel =  db.model('Discount', DiscountSchema);

module.exports = discountModel;