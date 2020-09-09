var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('manager'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `managers`
const managerSchema = new mongoose.Schema({
    userID: { type: Number, required: true },
    isSysAd: { type: Boolean, required: true }
}, {collection: "Managers"});

const managerModel = db.model('Managers', managerSchema);

module.exports = managerModel;