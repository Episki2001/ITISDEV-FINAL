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
    sellingPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    dateSold: { type: Number, required: true },
    productID: { type: Number, required: true },
    userID: { type: Number, required: true }
}, { collection: "sales" });



SalesSchema.methods.recordNewSale = async function() {
    // let { } = req.body;
    return console.log('salesModel.methods.newSale');

    // await this.create({
    //     saleID: saleID,
    //     quantity: quantity,
    //     sellingPrice: sellingPrice,
    //     total: total,
    //     dateSold: dateSold,
    //     productID: productID,
    //     userID: userID
    // }, function(err) {
    //     if (err) {
    //         console.log(err);
    //         throw (err);
    //     }
    // });

    // alert('Sale recorded');
    // res.redirect('/a/sales');
};

const salesModel = db.model('sales', SalesSchema);

module.exports = salesModel;