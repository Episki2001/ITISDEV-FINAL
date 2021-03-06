// import module `mongoose`
var mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('ref_category'); },
        err => {
            console.log('theres problems');
        });

var db = mongoose.connection;

// defines the schema for collection `ref_category`
var Ref_CategorySchema = new mongoose.Schema({
    CategoryCode: { type: Number, required: true },
    categoryName: { type: String, required: true },
    ProductType: { type: String, required: true }
}, {collection: "ref_category"});

const ref_categoryModel = db.model('ref_category', Ref_CategorySchema);

module.exports = ref_categoryModel;