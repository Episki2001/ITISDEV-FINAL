var mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/LovelyHomes'

const managerSchema = new mongoose.Schema({
    userID: { type: Number, required: true },
    isSysAd: { type: Boolean, required: true }
});

module.exports = mongoose.model('managers', managerSchema);