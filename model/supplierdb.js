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
}, {collection: "Supplier"});

SupplierSchema.methods.recordNewSupplier = async function() {
    var result = supplierModel.create(this);
    console.log(JSON.stringify(result));
    return result;
};

const supplierModel = db.model('Supplier', SupplierSchema);

module.exports = supplierModel;