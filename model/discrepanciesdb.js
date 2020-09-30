var mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('discrepancy'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `discrepancies`
const discrepancySchema = new mongoose.Schema({
    discrepancyID: { type: Number, required: true },
    oldCount: { type: Number, required: true },
    newCount: { type: Number, required: true },
    date: { type: Date, required: true },
    userID: { type: Number, required: true },
    productID: { type: Number, required: true }
}, {collection: "Discrepancy"});

discrepancySchema.methods.recordNewDiscrepancy = async function() {
    var result = DiscrepancyModel.create(this);
    console.log(JSON.stringify(result));
    return result;
};

const DiscrepancyModel = db.model('Discrepancy', discrepancySchema);

module.exports = DiscrepancyModel;