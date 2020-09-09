// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('sales'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `suppliers`
var SalesSchema = new mongoose.Schema({
    salesID: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    dateSold: { type: Number, required: true },
    productID: { type: Number, required: true },
    userID: { type: Number, required: true }
});

const salesModel = mongoose.model('Sales', SalesSchema);

module.exports = salesModel;