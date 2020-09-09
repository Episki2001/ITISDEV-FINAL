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

// Data for population
let userData = [
    { "userID": 10000001, "password": "HzNnuoba0", "lastName": "Bool", "firstName": "Maribel", "gender": "F", "birthdate": "10/07/1980", "address": "Lucena City", "phoneNumber": "09176588231", "dateHired": "27/07/2000", "dateFired": null },
    { "userID": 10000002, "password": "MESLi8zQh7tK", "lastName": "Bool", "firstName": "John", "gender": "M", "birthdate": "23/10/1983", "address": "Lucena City", "phoneNumber": "09179166663", "dateHired": "17/10/2000", "dateFired": null },
    { "userID": 10000003, "password": "4xhm1S", "lastName": "Jackie", "firstName": "Romonda", "gender": "F", "birthdate": "08/07/1995", "address": "Lucban City", "phoneNumber": "09179751234", "dateHired": "14/09/2016", "dateFired": null },
    { "userID": 10000004, "password": "9JXKOhre", "lastName": "Ballmark", "firstName": "Valentin", "gender": "M", "birthdate": "26/10/1990", "address": "Tagbilao City", "phoneNumber": "09174613405", "dateHired": "15/04/2020", "dateFired": null },
    { "userID": 10000005, "password": "HzNnuoba0", "lastName": "Hablet", "firstName": "Randie", "gender": "M", "birthdate": "27/01/1991", "address": "Lucban City", "phoneNumber": "09176588236", "dateHired": "27/07/2015", "dateFired": null },
    { "userID": 10000006, "password": "MESLi8zQh7tK", "lastName": "Houtby", "firstName": "Lidia", "gender": "F", "birthdate": "14/03/1988", "address": "Tayabas City", "phoneNumber": "09179166666", "dateHired": "17/10/2017", "dateFired": null },
    { "userID": 10000007, "password": "4xhm1S", "lastName": "Mackie", "firstName": "Romonda", "gender": "F", "birthdate": "08/07/1995", "address": "Lucban City", "phoneNumber": "09179751231", "dateHired": "19/09/2016", "dateFired": null },
    { "userID": 10000008, "password": "9JXKOhre", "lastName": "Allmark", "firstName": "Valentin", "gender": "M", "birthdate": "26/10/1990", "address": "Tagbilao City", "phoneNumber": "09174613409", "dateHired": "15/04/2020", "dateFired": null },
    { "userID": 10000009, "password": "rF1W7ty2gwO", "lastName": "Storrie", "firstName": "Josie", "gender": "F", "birthdate": "27/04/1989", "address": "Lucban City", "phoneNumber": "09172746921", "dateHired": "25/07/2018", "dateFired": null },
    { "userID": 10000010, "password": "1ihCo9zh9W", "lastName": "Newlands", "firstName": "Addison", "gender": "M", "birthdate": "27/02/1995", "address": "Lucban City", "phoneNumber": "09179296788", "dateHired": "04/01/2018", "dateFired": null },
    { "userID": 10000011, "password": "x0Zbwpz", "lastName": "Aloigi", "firstName": "Andrea", "gender": "F", "birthdate": "24/11/1985", "address": "Tagbilao City", "phoneNumber": "09171947151", "dateHired": "03/02/2016", "dateFired": null },
    { "userID": 10000012, "password": "rCTO7QDuEa", "lastName": "Goodright", "firstName": "Annabell", "gender": "F", "birthdate": "28/05/1993", "address": "Lucban City", "phoneNumber": "09176945841", "dateHired": "23/05/2018", "dateFired": null },
    { "userID": 10000013, "password": "Xlnf7Zeo", "lastName": "Ferrucci", "firstName": "April", "gender": "F", "birthdate": "01/02/1990", "address": "Lucena City", "phoneNumber": "09173187003", "dateHired": "01/09/2015", "dateFired": null },
    { "userID": 10000014, "password": "0ucC3RqPGSA9", "lastName": "Trayford", "firstName": "Ardenia", "gender": "F", "birthdate": "07/09/1993", "address": "Lucena City", "phoneNumber": "09174630076", "dateHired": "17/10/2019", "dateFired": null },
    { "userID": 10000015, "password": "kUzkEj8", "lastName": "Adenet", "firstName": "Marjorie", "gender": "F", "birthdate": "06/09/1986", "address": "Tayabas City", "phoneNumber": "09179740162", "dateHired": "20/09/2019", "dateFired": null },
    { "userID": 10000016, "password": "xktNTtg", "lastName": "Petrie", "firstName": "Sidonia", "gender": "F", "birthdate": "29/03/1995", "address": "Tagbilao City", "phoneNumber": "09174905050", "dateHired": "08/10/2019", "dateFired": null },
    { "userID": 10000017, "password": "fzhvS5VWxG", "lastName": "Scadding", "firstName": "Cicely", "gender": "F", "birthdate": "15/04/1989", "address": "Lucban City", "phoneNumber": "09177498945", "dateHired": "11/12/2016", "dateFired": null },
    { "userID": 10000018, "password": "Zpqcl3O", "lastName": "Arnoult", "firstName": "Elvira", "gender": "F", "birthdate": "20/03/1986", "address": "Lucena City", "phoneNumber": "09176235686", "dateHired": "14/01/2020", "dateFired": null },
    { "userID": 10000019, "password": "s7LOBCN", "lastName": "Robrose", "firstName": "Arlette", "gender": "F", "birthdate": "30/06/1994", "address": "Tayabas City", "phoneNumber": "09171849934", "dateHired": "20/05/2019", "dateFired": null },
    { "userID": 10000020, "password": "ycy1ckw", "lastName": "Prevost", "firstName": "Inger", "gender": "M", "birthdate": "25/02/1989", "address": "Tagbilao City", "phoneNumber": "09176092169", "dateHired": "03/12/2015", "dateFired": null },
    { "userID": 10000021, "password": "FpKS3ulO5", "lastName": "Alexandrescu", "firstName": "Lorette", "gender": "F", "birthdate": "15/01/1995", "address": "Tagbilao City", "phoneNumber": "09177956864", "dateHired": "10/03/2015", "dateFired": null },
    { "userID": 10000022, "password": "oAw0fiK0jH", "lastName": "Snoxell", "firstName": "Olly", "gender": "M", "birthdate": "27/02/1987", "address": "Lucban City", "phoneNumber": "09170949968", "dateHired": "15/09/2019", "dateFired": null },
    { "userID": 10000023, "password": "5740Fs3CI", "lastName": "Tuffrey", "firstName": "Katrinka", "gender": "F", "birthdate": "22/10/1990", "address": "Tayabas City", "phoneNumber": "09179709497", "dateHired": "06/11/2015", "dateFired": null },
    { "userID": 10000024, "password": "s0GuucuQjyh", "lastName": "Mea", "firstName": "Brenden", "gender": "M", "birthdate": "09/11/1993", "address": "Tagbilao City", "phoneNumber": "09174484593", "dateHired": "23/09/2016", "dateFired": null }
]
async function populate(userData, managerData, supplierData, damagedData, productData, salesData, deliveryData, purchaseData, ref_categorydata, discrepancyData) {
    // Connect to Database
    const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }

    try {
        let db = mongoose.connect(url, options)
        await userModel.deleteMany({})
        await managerModel.deleteMany({})
        await supplierModel.deleteMany({})
        await damagedGoodsModel.deleteMany({})
        await productModel.deleteMany({})
        await salesModel.deleteMany({})
        await deliveryModel.deleteMany({})
        await purchaseModel.deleteMany({})
        await ref_categoryModel.deleteMany({})
        await discrepanciesModel.deleteMany({})

        userData.forEach((user) => {
            user.password = bcrypt.hashSync(user.password, 10)
            user.birthdate = new Date(user.birthdate)
            user.dateHired = new Date(user.dateHired)
        })

        damagedData.forEach((damaged) => {
            damaged.dateDamaged = new Date(damaged.dateDamaged)
        })

        discrepancyData.forEach((discrepancy) => {
            discrepancy.date = new Date(discrepancy.date)
        })

        salesData.forEach((sales) => {
            sales.dateSold = new Date(sales.dateSold)
        })

        purchaseData.forEach((purchase) => {
            purchase.datePurchased = new Date(purchase.datePurchased)
        })

        deliveryData.forEach((delivery) => {
            delivery.dateDelivered = new Date(delivery.dateDelivered)
        })


        await userModel.insertMany(userData)
        await managerModel.insertMany(managerData)
        await supplierModel.insertMany(supplierData)
        await damagedGoodsModel.insertMany(damagedData)
        await productModel.insertMany(productData)
        await salesModel.insertMany(salesData)
        await deliveryModel.insertMany(deliveryData)
        await purchaseModel.insertMany(purchaseData)
        await ref_categoryModel.insertMany(ref_categorydata)
        await discrepanciesModel.insertMany(discrepancyData)

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

populate(userData, managerData, supplierData, damagedData, productData, salesData, deliveryData, purchaseData, ref_categorydata, discrepancyData)