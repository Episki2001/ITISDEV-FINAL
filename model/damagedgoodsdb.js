var mongoose = require('mongoose');

const damagedgoodsSchema = new mongoose.Schema({
    dmgrecordID: { type: Number, required: true },
    dateDamaged: { type: Date, required: true },
    numDamaged: { type: Number, required: true },
    approved: { type: Boolean, required: false },
    comments: { type: String, required: true },
    userID: { type: Number, required: true },
    productID: { type: Number, required: true },
    managerID: { type: Number, required: false }


});

module.exports = mongoose.model('damagedgoods', damagedgoodsSchema);