// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('threshold'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `thresholds`
var ThresholdSchema = new mongoose.Schema({
    thresholdID: { type: Number, required: true },
    thresholdType: { type: String, required: true },
    number: { type: Number, required: true },
    productID: { type: Number, required: true },
    UserID: { type: Number, required: true }
}, {collection: "Threshold"});

const thresholdModel = db.model('Threshold', ThresholdSchema);

module.exports = thresholdModel