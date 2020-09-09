var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

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