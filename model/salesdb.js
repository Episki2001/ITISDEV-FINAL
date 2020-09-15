// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('sales'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection sales`
var SalesSchema = new mongoose.Schema({
    salesID: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sellingPrice: mongoose.Types.Decimal128,
    total: mongoose.Types.Decimal128,
    dateSold: { type: Date, required: true },
    productID: { type: Number, required: true },
    userID: { type: Number, required: true }
}, { collection: "sales" });

SalesSchema.methods.recordNewSale = async function() {
    salesModel.create(this);
    return console.log(this);
};

const salesModel = db.model('sales', SalesSchema);

module.exports = salesModel;