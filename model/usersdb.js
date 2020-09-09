var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('user'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

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
}, {collection: "Users"});

const userModel = db.model('Users', userSchema);

module.exports = userModel;