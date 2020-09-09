// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('supplier'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `suppliers`
var SupplierSchema = new mongoose.Schema({
    supplierID: {  type: Number, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    phoneNum: { type: String, required: true },
    email: { type: String, required: true }
});

const supplierModel = mongoose.model('Supplier', SupplierSchema);

module.exports = supplierModel;