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
    phoneNumber: { type: String, required: true },
    dateHired: { type: Date, required: true },
    dateFired: { type: Date, required: false }
}, { collection: "users" });

userSchema.methods.recordNewUser = async function() {
    var result = userModel.create(this);
    console.log(JSON.stringify(result));
    return result;
};
const userModel = db.model('users', userSchema);

module.exports = userModel;