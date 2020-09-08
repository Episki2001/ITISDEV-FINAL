var mongoose = require('mongoose');

const discrepancySchema = new mongoose.Schema({
    discrepancyID: { type: Number, required: true },
    oldCount: { type: Number, required: true },
    newCount: { type: Number, required: true },
    date: { type: Date, required: true },
    userID: { type: Number, required: true },
    productID: { type: Number, required: true }
});

module.exports = mongoose.model('discrepancies', discrepancySchema);