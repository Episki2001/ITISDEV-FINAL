// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('purchase'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `purchase`
var PurchaseSchema = new mongoose.Schema({
    purchaseID: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    datePurchased: { type: Date, required: true },
    totalCost: { type: Number,  required: true },
    managerID: { type: Number, required: true }
}, {collection: "Purchases"});

const purchaseModel = db.model('Purchases', PurchaseSchema);

module.exports = purchaseModel;