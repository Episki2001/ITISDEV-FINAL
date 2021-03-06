const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userModel = require('../model/usersdb');
const managerModel = require('../model/managersdb');
const productModel = require('../model/productdb');
const ref_categoryModel = require('../model/ref_categorydb');
const thresholdModel = require('../model/thresholddb');
const salesModel = require('../model/salesdb');
const supplierModel = require('../model/supplierdb');
const discountModel = require('../model/discountdb');
const deliveryModel = require('../model/deliverydb');
const purchaseModel = require('../model/purchasedb');
const discrepanciesModel = require('../model/discrepanciesdb');
const damagedGoodsModel = require('../model/damagedgoodsdb');

let productData = [
    { "productID": 30000005, "productName": "Plastic Chairs", "currentStock": 87, "sellingPrice": 300.00, "purchasePrice": 100.00, "supplierID": 20000001, "categoryCode": 101 },
    { "productID": 30000006, "productName": "Wooden Chairs", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000001, "categoryCode": 101 },
    { "productID": 30000007, "productName": "Water Beds", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000001, "categoryCode": 102 },
    { "productID": 30000008, "productName": "Bunk Beds", "currentStock": 50, "sellingPrice": 5500.00, "purchasePrice": 4500.00, "supplierID": 20000001, "categoryCode": 102 },
    { "productID": 30000009, "productName": "Living Room Sofas", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000002, "categoryCode": 103 },
    { "productID": 30000010, "productName": "Business Sofas", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000002, "categoryCode": 103 },
    { "productID": 30000011, "productName": "Plastic Cabinets", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000002, "categoryCode": 104 },
    { "productID": 30000012, "productName": "Wooden Cabinets", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000002, "categoryCode": 104 },
    { "productID": 30000013, "productName": "Full Body Mirrors", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000003, "categoryCode": 105 },
    { "productID": 30000014, "productName": "Desks with Mirror", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 2000003, "categoryCode": 105 },
    { "productID": 30000015, "productName": "Plastic Drawers", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000003, "categoryCode": 106 },
    { "productID": 30000016, "productName": "Wooden Drawers", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000003, "categoryCode": 106 },
    { "productID": 30000017, "productName": "Plastic Closets", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000004, "categoryCode": 107 },
    { "productID": 30000018, "productName": "Wooden Closets", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000004, "categoryCode": 107 },
    { "productID": 30000019, "productName": "Family-sized Dining Table", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000004, "categoryCode": 108 },
    { "productID": 30000020, "productName": "Solo Dining Table", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000004, "categoryCode": 108 },
    { "productID": 30000021, "productName": "Living Room Table", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000005, "categoryCode": 109 },
    { "productID": 30000022, "productName": "Bedroom Table", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000005, "categoryCode": 109 },
    { "productID": 30000023, "productName": "Soft Recliner", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000005, "categoryCode": 110 },
    { "productID": 30000024, "productName": "Hard Recliner", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000005, "categoryCode": 110 },
    { "productID": 30000001, "productName": "Large TV Stand", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000005, "categoryCode": 111 },
    { "productID": 30000002, "productName": "Meduim TV Stand", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000005, "categoryCode": 111 },
    { "productID": 30000003, "productName": "Large Water Heater", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000006, "categoryCode": 201 },
    { "productID": 30000004, "productName": "Meduim Water Heater", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000006, "categoryCode": 201 },
    { "productID": 30000025, "productName": "Small Water Heater", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000006, "categoryCode": 201 },
    { "productID": 30000026, "productName": "Large TV", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000007, "categoryCode": 202 },
    { "productID": 30000027, "productName": "Meduim TV", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000007, "categoryCode": 202 },
    { "productID": 30000028, "productName": "Smart TV", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000007, "categoryCode": 202 },
    { "productID": 30000029, "productName": "Large Electric Fan", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000008, "categoryCode": 203 },
    { "productID": 30000030, "productName": "Meduim Electric Fan", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000008, "categoryCode": 203 },
    { "productID": 30000031, "productName": "Handheld Electric Fan", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000008, "categoryCode": 203 },
    { "productID": 30000032, "productName": "Large ceiling Fan", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000009, "categoryCode": 204 },
    { "productID": 30000033, "productName": "Meduim ceiling Fan", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000009, "categoryCode": 204 },
    { "productID": 30000034, "productName": "Wall Fan", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000009, "categoryCode": 204 },
    { "productID": 30000035, "productName": "Small Electric Stove", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 2000010, "categoryCode": 205 },
    { "productID": 30000036, "productName": "Meduim Electric Stove", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000010, "categoryCode": 205 },
    { "productID": 30000037, "productName": "Induction Stove", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000010, "categoryCode": 205 },
    { "productID": 30000038, "productName": "Large Speakers", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000010, "categoryCode": 206 },
    { "productID": 30000039, "productName": "Meduim Speakers", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000010, "categoryCode": 206 },
    { "productID": 30000040, "productName": "Small Speakers", "currentStock": 50, "sellingPrice": 500.00, "purchasePrice": 350.00, "supplierID": 20000010, "categoryCode": 206 }
]

async function populate(productData) {
    // Connect to Database
    const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }

    try {
        let db = mongoose.connect(url, options)

        await productModel.deleteMany({});


        productData.forEach(async(product) => {
            try {
                await productModel.create({
                    productID: product.productID,
                    productName: product.productName,
                    currentStock: product.currentStock,
                    sellingPrice: Number.parseFloat(product.sellingPrice),
                    purchasePrice: Number.parseFloat(product.purchasePrice),
                    categoryCode: product.categoryCode,
                    supplierID: product.supplierID
                });
            } catch (err) {
                throw err;
            }

        })


        console.log('Database populated \\o/');
    } catch (err) {
        throw err
    } finally {
        mongoose.connection.close(() => {
            console.log('Disconnected from MongoDB, bye o/');
            process.exit(0);
        })
    }
}

populate(productData)