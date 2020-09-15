const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const productModel = require('../model/productdb');
const managerModel = require('../model/managersdb');
// testing out variables for creation
async function populate() {
    // Connect to Database
    const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }

    try {
        let db = mongoose.connect(url, options)
        var categoryCode = '101';
        var sellingPrice = 900; //auto defaults to int if integer
        var purchasePrice = 200; //auto defaults to int if integer
        var type = 'F'
        var supplierID = 20000001
        var highestID = await productModel.aggregate([{
            '$sort': {
                'productID': -1
            }
        }, {
            '$limit': 1
        }, {
            '$project': {
                'productID': 1
            }
        }]);
        var productID = highestID[0].productID + 1;
        var currentStock = '200'; // doesn't matter if string or int when received
        var productName = "test";

        var create = await productModel.create({
            productID: productID,
            categoryCode: categoryCode,
            sellingPrice: sellingPrice,
            purchasePrice: purchasePrice,
            type: type,
            supplierID: supplierID,
            currentStock: currentStock,
            productName: productName
        });

        console.log(create);
        console.log('Database populated \\o/')
    } catch (err) {
        throw err
    } finally {
        mongoose.connection.close(() => {
            console.log('Disconnected from MongoDB, bye o/')
            process.exit(0)
        })
    }
}

populate()