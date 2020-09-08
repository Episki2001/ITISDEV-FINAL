var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: Number, required: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    gender: { type: String, required: true },
    birthdate: { type: Date, required: true },
    address: { type: String, required: true },
    phonenumber: { type: String, required: true },
    dateHired: { type: Date, required: true },
    dateFired: { type: Date, required: false }
});

module.exports = mongoose.model('users', userSchema);