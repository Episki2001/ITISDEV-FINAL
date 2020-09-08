var mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    userID: { type: Number, required: true },
    isSysAd: { type: Boolean, required: true }
});

module.exports = mongoose.model('managers', managerSchema);