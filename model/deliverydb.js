// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('delivery'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `deliveries`
var DeliverySchema = new mongoose.Schema({
    deliveryID: { type: Number, required: true },
    number_Of_Units_Delivered: { type: Number,  required: true },
    number_Of_Damaged: { type: Number, required: true },
    dateDelivered: { type: Date, required: true },
    productID: { type: Number, required: true },
    userID: {  type: Number, required: true }
}, {collection: "Delivery"});

const deliveryModel = db.model('Delivery', DeliverySchema);

module.exports = deliveryModel;