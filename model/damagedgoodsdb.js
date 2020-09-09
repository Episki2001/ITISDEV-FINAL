var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('damagedgoods'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;


const damagedgoodsSchema = new mongoose.Schema({
    dmgrecordID: { type: Number, required: true },
    dateDamaged: { type: Date, required: true },
    numDamaged: { type: Number, required: true },
    approved: { type: Boolean, required: false },
    comments: { type: String, required: true },
    userID: { type: Number, required: true },
    productID: { type: Number, required: true },
    managerID: { type: Number, required: false }
});

const damagedgoodsModel = mongoose.model('Damagedgoods', damagedgoodsSchema);

module.exports = damagedgoodsModel;