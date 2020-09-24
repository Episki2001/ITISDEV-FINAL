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
}, { collection: "managers" });

managerSchema.methods.recordNewManager = async function() {
    var result = await managerModel.create(this);
    console.log(result);
    return result;
};

const managerModel = db.model('managers', managerSchema);

module.exports = managerModel;