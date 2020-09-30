const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userModel = require('../model/usersdb');
const supplierModel = require('../model/supplierdb');
const productModel = require('../model/productdb');
// Data for population

async function getsupplierproducts() {
    console.log('lol');
    var products = await productModel.aggregate([{
        '$match': {
            'supplierID': 20000001
        }
    }, {
        '$project': {
            'productID': 1
        }
    }]);
    console.log('in here');
    console.log(products);
}

async function getSalesList() {

}

async function getSales() {
    // Connect to Database
    // const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    // const options = {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    //     useCreateIndex: true
    // }

    try {
        console.log('made it');
        var products = await getsupplierproducts();
        console.log(products);
        console.log('made it');
    } catch (err) {
        throw err
    } finally {
        mongoose.connection.close(() => {
            console.log('Disconnected from MongoDB, bye o/')
            process.exit(0)
        })
    }
}
getSales()