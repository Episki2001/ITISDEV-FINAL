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

let managerData = [{
        "userID": 10000001,
        "isSysAd": true
    },
    {
        "userID": 10000001,
        "isSysAd": true
    },
    {
        "userID": 10000001,
        "isSysAd": false
    },
    {
        "userID": 10000001,
        "isSysAd": false
    }
]

let supplierData = [
    { "supplierID": 20000001, "companyName": "Hintz-Buckridge", "email": "HintzBuckridge@gmail.com", "companyAddres": "Lucena City", "phoneNum": "2069714" },
    { "supplierID": 20000002, "companyName": "Shields Group", "email": "ShieldsGroup@gmail.com", "companyAddres": "Lucena City", "phoneNum": "8795200" },
    { "supplierID": 20000003, "companyName": "Torp, Rodriguez and Rohan", "email": "TorpRodriguezandRohan@gmail.com", "companyAddres": "Lucena City", "phoneNum": "4805779" },
    { "supplierID": 20000004, "companyName": "Flatley Inc", "email": "FlatleyInc@gmail.com", "companyAddres": "Manila City", "phoneNum": "3646228" },
    { "supplierID": 20000005, "companyName": "Schuppe, Zboncak and Cremin", "email": "SchuppeZboncakandCremin@gmail.com", "companyAddres": "Manila City", "phoneNum": "1848299" },
    { "supplierID": 20000006, "companyName": "Romaguera Group", "email": "RomagueraGroup@gmail.com", "companyAddres": "Manila City", "phoneNum": "6357761" },
    { "supplierID": 20000007, "companyName": "Schmidt-West", "email": "SchmidtWest@gmail.com", "companyAddres": "Manila City", "phoneNum": "8674669" },
    { "supplierID": 20000008, "companyName": "West-Welch", "email": "WestWelch@gmail.com", "companyAddres": "Quezon City", "phoneNum": "3626701" },
    { "supplierID": 20000009, "companyName": "Feeney, Miller and Stracke", "email": "FeeneyMillerandStracke@gmail.com", "companyAddres": "Quezon City", "phoneNum": "2663566" },
    { "supplierID": 20000010, "companyName": "Konopelski Group", "email": "KonopelskiGroup@gmail.com", "companyAddres": "Quezon City", "phoneNum": "577376" }
]

let damagedData = [{
        "dmgrecordID": 80000201,
        "dateDamaged": "05/04/2020",
        "numDamaged": 1,
        "approved": true,
        "comments": "Broken units",
        "userID": 10000022,
        "productID": 30000008,
        "managerID": 10000002
    },
    {
        "dmgrecordID": 80000202,
        "dateDamaged": "17/07/2020",
        "numDamaged": 2,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000009,
        "productID": 30000008,
        "managerID": 10000002
    },
    {
        "dmgrecordID": 80000001,
        "dateDamaged": "09/03/2020",
        "numDamaged": 2,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000018,
        "productID": 30000005,
        "managerID": 10000002
    },
    {
        "dmgrecordID": 80000002,
        "dateDamaged": "15/03/2020",
        "numDamaged": 5,
        "approved": true,
        "comments": "Broken units",
        "userID": 10000009,
        "productID": 30000005,
        "managerID": 10000003
    },
    {
        "dmgrecordID": 80000003,
        "dateDamaged": "28/03/2020",
        "numDamaged": 7,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000002,
        "productID": 30000005,
        "managerID": 10000001
    },
    {
        "dmgrecordID": 80000004,
        "dateDamaged": "18/04/2020",
        "numDamaged": 2,
        "approved": true,
        "comments": "Broken units",
        "userID": 10000022,
        "productID": 30000005,
        "managerID": 10000004
    },
    {
        "dmgrecordID": 80000005,
        "dateDamaged": "22/04/2020",
        "numDamaged": 7,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000002,
        "productID": 30000005,
        "managerID": 10000003
    },
    {
        "dmgrecordID": 80000006,
        "dateDamaged": "26/04/2020",
        "numDamaged": 10,
        "approved": true,
        "comments": "Missing pieces",
        "userID": 10000002,
        "productID": 30000005,
        "managerID": 10000003
    },
    {
        "dmgrecordID": 80000007,
        "dateDamaged": "03/05/2020",
        "numDamaged": 2,
        "approved": true,
        "comments": "Broken units",
        "userID": 10000007,
        "productID": 30000005,
        "managerID": 10000004
    },
    {
        "dmgrecordID": 80000008,
        "dateDamaged": "07/05/2020",
        "numDamaged": 4,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000008,
        "productID": 30000005,
        "managerID": 10000004
    },
    {
        "dmgrecordID": 80000009,
        "dateDamaged": "11/05/2020",
        "numDamaged": 2,
        "approved": true,
        "comments": "Broken units",
        "userID": 10000024,
        "productID": 30000005,
        "managerID": 10000001
    },
    {
        "dmgrecordID": 80000010,
        "dateDamaged": "05/06/2020",
        "numDamaged": 5,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000014,
        "productID": 30000005,
        "managerID": 10000004
    },
    {
        "dmgrecordID": 80000011,
        "dateDamaged": "27/06/2020",
        "numDamaged": 3,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000020,
        "productID": 30000005,
        "managerID": 10000002
    },
    {
        "dmgrecordID": 80000012,
        "dateDamaged": "05/08/2020",
        "numDamaged": 5,
        "approved": true,
        "comments": "Missing pieces",
        "userID": 10000023,
        "productID": 30000005,
        "managerID": 10000004
    },
    {
        "dmgrecordID": 80000013,
        "dateDamaged": "29/08/2020",
        "numDamaged": 3,
        "approved": true,
        "comments": "Accrued Water Damage",
        "userID": 10000011,
        "productID": 30000005,
        "managerID": 10000001
    }
]

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

let salesData = [{
        "salesID": 50000201,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "09/03/2020",
        "productID": 30000008,
        "userID": 10000021
    },
    {
        "salesID": 50000202,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "17/03/2020",
        "productID": 30000008,
        "userID": 10000018
    },
    {
        "salesID": 50000203,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "28/03/2020",
        "productID": 30000008,
        "userID": 10000023
    },
    {
        "salesID": 50000204,
        "quantity": 2,
        "sellingPrice": 5500,
        "total": 11000,
        "dateSold": "13/04/2020",
        "productID": 30000008,
        "userID": 10000005
    },
    {
        "salesID": 50000205,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "24/04/2020",
        "productID": 30000008,
        "userID": 10000005
    },
    {
        "salesID": 50000206,
        "quantity": 3,
        "sellingPrice": 5500,
        "total": 16500,
        "dateSold": "02/05/2020",
        "productID": 30000008,
        "userID": 10000014
    },
    {
        "salesID": 50000207,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "10/05/2020",
        "productID": 30000008,
        "userID": 10000009
    },
    {
        "salesID": 50000208,
        "quantity": 2,
        "sellingPrice": 5500,
        "total": 11000,
        "dateSold": "20/05/2020",
        "productID": 30000008,
        "userID": 10000017
    },
    {
        "salesID": 50000209,
        "quantity": 5,
        "sellingPrice": 5500,
        "total": 27500,
        "dateSold": "28/05/2020",
        "productID": 30000008,
        "userID": 10000021
    },
    {
        "salesID": 50000210,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "05/06/2020",
        "productID": 30000008,
        "userID": 10000018
    },
    {
        "salesID": 50000211,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "13/06/2020",
        "productID": 30000008,
        "userID": 10000004
    },
    {
        "salesID": 50000212,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "23/06/2020",
        "productID": 30000008,
        "userID": 10000008
    },
    {
        "salesID": 50000213,
        "quantity": 2,
        "sellingPrice": 5500,
        "total": 11000,
        "dateSold": "01/07/2020",
        "productID": 30000008,
        "userID": 10000018
    },
    {
        "salesID": 50000214,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "09/07/2020",
        "productID": 30000008,
        "userID": 10000018
    },
    {
        "salesID": 50000215,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "25/07/2020",
        "productID": 30000008,
        "userID": 10000015
    },
    {
        "salesID": 50000216,
        "quantity": 2,
        "sellingPrice": 5500,
        "total": 11000,
        "dateSold": "04/08/2020",
        "productID": 30000008,
        "userID": 10000019
    },
    {
        "salesID": 50000217,
        "quantity": 1,
        "sellingPrice": 5500,
        "total": 5500,
        "dateSold": "12/08/2020",
        "productID": 30000008,
        "userID": 10000003
    },
    {
        "salesID": 50000218,
        "quantity": 2,
        "sellingPrice": 5500,
        "total": 11000,
        "dateSold": "20/08/2020",
        "productID": 30000008,
        "userID": 10000021
    },
    {
        "salesID": 50000001,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "02/03/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000002,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "03/03/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000003,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "04/03/2020",
        "productID": 30000005,
        "userID": 10000017
    },
    {
        "salesID": 50000004,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "05/03/2020",
        "productID": 30000005,
        "userID": 10000003
    },
    {
        "salesID": 50000005,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "06/03/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000006,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "07/03/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000007,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "08/03/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000008,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "09/03/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000009,
        "quantity": 13,
        "sellingPrice": 300,
        "total": 3900,
        "dateSold": "10/03/2020",
        "productID": 30000005,
        "userID": 10000022
    },
    {
        "salesID": 50000010,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "12/03/2020",
        "productID": 30000005,
        "userID": 10000017
    },
    {
        "salesID": 50000011,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "13/03/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000012,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "14/03/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000013,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "15/03/2020",
        "productID": 30000005,
        "userID": 10000003
    },
    {
        "salesID": 50000014,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "16/03/2020",
        "productID": 30000005,
        "userID": 10000024
    },
    {
        "salesID": 50000015,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "17/03/2020",
        "productID": 30000005,
        "userID": 10000006
    },
    {
        "salesID": 50000016,
        "quantity": 9,
        "sellingPrice": 300,
        "total": 2700,
        "dateSold": "18/03/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000017,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "19/03/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "salesID": 50000018,
        "quantity": 20,
        "sellingPrice": 300,
        "total": 6000,
        "dateSold": "20/03/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "salesID": 50000019,
        "quantity": 17,
        "sellingPrice": 300,
        "total": 5100,
        "dateSold": "21/03/2020",
        "productID": 30000005,
        "userID": 10000006
    },
    {
        "salesID": 50000020,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "22/03/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000021,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "23/03/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000022,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "24/03/2020",
        "productID": 30000005,
        "userID": 10000001
    },
    {
        "salesID": 50000023,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "25/03/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000024,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "26/03/2020",
        "productID": 30000005,
        "userID": 10000019
    },
    {
        "salesID": 50000025,
        "quantity": 17,
        "sellingPrice": 300,
        "total": 5100,
        "dateSold": "27/03/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000026,
        "quantity": 18,
        "sellingPrice": 300,
        "total": 5400,
        "dateSold": "28/03/2020",
        "productID": 30000005,
        "userID": 10000003
    },
    {
        "salesID": 50000027,
        "quantity": 16,
        "sellingPrice": 300,
        "total": 4800,
        "dateSold": "29/03/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000028,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "30/03/2020",
        "productID": 30000005,
        "userID": 10000006
    },
    {
        "salesID": 50000029,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "31/03/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000030,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "01/04/2020",
        "productID": 30000005,
        "userID": 10000006
    },
    {
        "salesID": 50000031,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "02/04/2020",
        "productID": 30000005,
        "userID": 10000006
    },
    {
        "salesID": 50000032,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "03/04/2020",
        "productID": 30000005,
        "userID": 10000024
    },
    {
        "salesID": 50000033,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "04/04/2020",
        "productID": 30000005,
        "userID": 10000001
    },
    {
        "salesID": 50000034,
        "quantity": 13,
        "sellingPrice": 300,
        "total": 3900,
        "dateSold": "05/04/2020",
        "productID": 30000005,
        "userID": 10000009
    },
    {
        "salesID": 50000035,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "06/04/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000036,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "07/04/2020",
        "productID": 30000005,
        "userID": 10000013
    },
    {
        "salesID": 50000037,
        "quantity": 20,
        "sellingPrice": 300,
        "total": 6000,
        "dateSold": "08/04/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000038,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "15/04/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000039,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "16/04/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000040,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "17/04/2020",
        "productID": 30000005,
        "userID": 10000001
    },
    {
        "salesID": 50000041,
        "quantity": 20,
        "sellingPrice": 300,
        "total": 6000,
        "dateSold": "18/04/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000042,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "19/04/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000043,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "20/04/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000044,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "21/04/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000045,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "23/04/2020",
        "productID": 30000005,
        "userID": 10000019
    },
    {
        "salesID": 50000046,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "24/04/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000047,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "25/04/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000048,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "26/04/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000049,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "28/04/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000050,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "29/04/2020",
        "productID": 30000005,
        "userID": 10000016
    },
    {
        "salesID": 50000051,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "30/04/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000052,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "01/05/2020",
        "productID": 30000005,
        "userID": 10000015
    },
    {
        "salesID": 50000053,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "02/05/2020",
        "productID": 30000005,
        "userID": 10000001
    },
    {
        "salesID": 50000054,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "03/05/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000055,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "06/05/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000056,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "07/05/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000057,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "08/05/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000058,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "09/05/2020",
        "productID": 30000005,
        "userID": 10000022
    },
    {
        "salesID": 50000059,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "10/05/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000060,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "11/05/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000061,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "12/05/2020",
        "productID": 30000005,
        "userID": 10000024
    },
    {
        "salesID": 50000062,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "14/05/2020",
        "productID": 30000005,
        "userID": 10000017
    },
    {
        "salesID": 50000063,
        "quantity": 9,
        "sellingPrice": 300,
        "total": 2700,
        "dateSold": "15/05/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000064,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "16/05/2020",
        "productID": 30000005,
        "userID": 10000016
    },
    {
        "salesID": 50000065,
        "quantity": 20,
        "sellingPrice": 300,
        "total": 6000,
        "dateSold": "17/05/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000066,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "18/05/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000067,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "19/05/2020",
        "productID": 30000005,
        "userID": 10000015
    },
    {
        "salesID": 50000068,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "20/05/2020",
        "productID": 30000005,
        "userID": 10000006
    },
    {
        "salesID": 50000069,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "21/05/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000070,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "22/05/2020",
        "productID": 30000005,
        "userID": 10000024
    },
    {
        "salesID": 50000071,
        "quantity": 16,
        "sellingPrice": 300,
        "total": 4800,
        "dateSold": "23/05/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "salesID": 50000072,
        "quantity": 9,
        "sellingPrice": 300,
        "total": 2700,
        "dateSold": "24/05/2020",
        "productID": 30000005,
        "userID": 10000022
    },
    {
        "salesID": 50000073,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "26/05/2020",
        "productID": 30000005,
        "userID": 10000004
    },
    {
        "salesID": 50000074,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "27/05/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000075,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "28/05/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000076,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "29/05/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "salesID": 50000077,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "30/05/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000078,
        "quantity": 30,
        "sellingPrice": 300,
        "total": 9000,
        "dateSold": "31/05/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000079,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "01/06/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "salesID": 50000080,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "02/06/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000081,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "03/06/2020",
        "productID": 30000005,
        "userID": 10000013
    },
    {
        "salesID": 50000082,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "04/06/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000083,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "05/06/2020",
        "productID": 30000005,
        "userID": 10000019
    },
    {
        "salesID": 50000084,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "06/06/2020",
        "productID": 30000005,
        "userID": 10000016
    },
    {
        "salesID": 50000085,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "07/06/2020",
        "productID": 30000005,
        "userID": 10000001
    },
    {
        "salesID": 50000086,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "09/06/2020",
        "productID": 30000005,
        "userID": 10000013
    },
    {
        "salesID": 50000087,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "10/06/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000088,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "12/06/2020",
        "productID": 30000005,
        "userID": 10000011
    },
    {
        "salesID": 50000089,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "13/06/2020",
        "productID": 30000005,
        "userID": 10000020
    },
    {
        "salesID": 50000090,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "14/06/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000091,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "15/06/2020",
        "productID": 30000005,
        "userID": 10000023
    },
    {
        "salesID": 50000092,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "16/06/2020",
        "productID": 30000005,
        "userID": 10000016
    },
    {
        "salesID": 50000093,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "18/06/2020",
        "productID": 30000005,
        "userID": 10000004
    },
    {
        "salesID": 50000094,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "19/06/2020",
        "productID": 30000005,
        "userID": 10000011
    },
    {
        "salesID": 50000095,
        "quantity": 16,
        "sellingPrice": 300,
        "total": 4800,
        "dateSold": "20/06/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000096,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "21/06/2020",
        "productID": 30000005,
        "userID": 10000024
    },
    {
        "salesID": 50000097,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "23/06/2020",
        "productID": 30000005,
        "userID": 10000023
    },
    {
        "salesID": 50000098,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "24/06/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000099,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "26/06/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000100,
        "quantity": 13,
        "sellingPrice": 300,
        "total": 3900,
        "dateSold": "27/06/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000101,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "28/06/2020",
        "productID": 30000005,
        "userID": 10000011
    },
    {
        "salesID": 50000102,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "29/06/2020",
        "productID": 30000005,
        "userID": 10000024
    },
    {
        "salesID": 50000103,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "30/06/2020",
        "productID": 30000005,
        "userID": 10000015
    },
    {
        "salesID": 50000104,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "01/07/2020",
        "productID": 30000005,
        "userID": 10000003
    },
    {
        "salesID": 50000105,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "02/07/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000106,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "04/07/2020",
        "productID": 30000005,
        "userID": 10000004
    },
    {
        "salesID": 50000107,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "05/07/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000108,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "07/07/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000109,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "09/07/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000110,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "10/07/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000111,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "11/07/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000112,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "12/07/2020",
        "productID": 30000005,
        "userID": 10000013
    },
    {
        "salesID": 50000113,
        "quantity": 1,
        "sellingPrice": 300,
        "total": 300,
        "dateSold": "13/07/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000114,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "14/07/2020",
        "productID": 30000005,
        "userID": 10000004
    },
    {
        "salesID": 50000115,
        "quantity": 10,
        "sellingPrice": 300,
        "total": 3000,
        "dateSold": "17/07/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "salesID": 50000116,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "18/07/2020",
        "productID": 30000005,
        "userID": 10000016
    },
    {
        "salesID": 50000117,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "19/07/2020",
        "productID": 30000005,
        "userID": 10000009
    },
    {
        "salesID": 50000118,
        "quantity": 20,
        "sellingPrice": 300,
        "total": 6000,
        "dateSold": "24/07/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000119,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "25/07/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000120,
        "quantity": 11,
        "sellingPrice": 300,
        "total": 3300,
        "dateSold": "26/07/2020",
        "productID": 30000005,
        "userID": 10000013
    },
    {
        "salesID": 50000121,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "27/07/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000122,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "28/07/2020",
        "productID": 30000005,
        "userID": 10000023
    },
    {
        "salesID": 50000123,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "29/07/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "salesID": 50000124,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "30/07/2020",
        "productID": 30000005,
        "userID": 10000017
    },
    {
        "salesID": 50000125,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "31/07/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000126,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "01/08/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000127,
        "quantity": 7,
        "sellingPrice": 300,
        "total": 2100,
        "dateSold": "02/08/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "salesID": 50000128,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "04/08/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000129,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "05/08/2020",
        "productID": 30000005,
        "userID": 10000022
    },
    {
        "salesID": 50000128,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "06/08/2020",
        "productID": 30000005,
        "userID": 10000011
    },
    {
        "salesID": 50000129,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "07/08/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000130,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "08/08/2020",
        "productID": 30000005,
        "userID": 10000023
    },
    {
        "salesID": 50000131,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "09/08/2020",
        "productID": 30000005,
        "userID": 10000019
    },
    {
        "salesID": 50000132,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "10/08/2020",
        "productID": 30000005,
        "userID": 10000009
    },
    {
        "salesID": 50000133,
        "quantity": 3,
        "sellingPrice": 300,
        "total": 900,
        "dateSold": "11/08/2020",
        "productID": 30000005,
        "userID": 10000003
    },
    {
        "salesID": 50000134,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "12/08/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000135,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "14/08/2020",
        "productID": 30000005,
        "userID": 10000016
    },
    {
        "salesID": 50000136,
        "quantity": 11,
        "sellingPrice": 300,
        "total": 3300,
        "dateSold": "15/08/2020",
        "productID": 30000005,
        "userID": 10000010
    },
    {
        "salesID": 50000137,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "16/08/2020",
        "productID": 30000005,
        "userID": 10000011
    },
    {
        "salesID": 50000138,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "18/08/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "salesID": 50000139,
        "quantity": 2,
        "sellingPrice": 300,
        "total": 600,
        "dateSold": "19/08/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000140,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "20/08/2020",
        "productID": 30000005,
        "userID": 10000008
    },
    {
        "salesID": 50000141,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "21/08/2020",
        "productID": 30000005,
        "userID": 10000009
    },
    {
        "salesID": 50000142,
        "quantity": 12,
        "sellingPrice": 300,
        "total": 3600,
        "dateSold": "22/08/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000143,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "23/08/2020",
        "productID": 30000005,
        "userID": 10000022
    },
    {
        "salesID": 50000144,
        "quantity": 4,
        "sellingPrice": 300,
        "total": 1200,
        "dateSold": "24/08/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000145,
        "quantity": 5,
        "sellingPrice": 300,
        "total": 1500,
        "dateSold": "26/08/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "salesID": 50000146,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "27/08/2020",
        "productID": 30000005,
        "userID": 10000001
    },
    {
        "salesID": 50000147,
        "quantity": 8,
        "sellingPrice": 300,
        "total": 2400,
        "dateSold": "28/08/2020",
        "productID": 30000005,
        "userID": 10000004
    },
    {
        "salesID": 50000148,
        "quantity": 15,
        "sellingPrice": 300,
        "total": 4500,
        "dateSold": "29/08/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "salesID": 50000149,
        "quantity": 20,
        "sellingPrice": 300,
        "total": 6000,
        "dateSold": "30/08/2020",
        "productID": 30000005,
        "userID": 10000012
    },
    {
        "salesID": 50000150,
        "quantity": 6,
        "sellingPrice": 300,
        "total": 1800,
        "dateSold": "31/08/2020",
        "productID": 30000005,
        "userID": 10000018
    }
]

let deliveryData = [{
        "deliveryID": 60000201,
        "number_Of_Units_Delivered": 10,
        "number_Of_Damaged": 0,
        "dateDelivered": "01/03/2020",
        "productID": 30000008,
        "userID": 10000016
    },
    {
        "deliveryID": 60000202,
        "number_Of_Units_Delivered": 6,
        "number_Of_Damaged": 1,
        "dateDelivered": "16/04/2020",
        "productID": 30000008,
        "userID": 10000003
    },
    {
        "deliveryID": 60000203,
        "number_Of_Units_Delivered": 10,
        "number_Of_Damaged": 0,
        "dateDelivered": "12/05/2020",
        "productID": 30000008,
        "userID": 10000001
    },
    {
        "deliveryID": 60000204,
        "number_Of_Units_Delivered": 8,
        "number_Of_Damaged": 1,
        "dateDelivered": "15/06/2020",
        "productID": 30000008,
        "userID": 10000023
    },
    {
        "deliveryID": 60000205,
        "number_Of_Units_Delivered": 9,
        "number_Of_Damaged": 0,
        "dateDelivered": "27/07/2020",
        "productID": 30000008,
        "userID": 10000022
    },
    {
        "deliveryID": 60000001,
        "number_Of_Units_Delivered": 100,
        "number_Of_Damaged": 20,
        "dateDelivered": "01/03/2020",
        "productID": 30000005,
        "userID": 10000023
    },
    {
        "deliveryID": 60000002,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 10,
        "dateDelivered": "11/03/2020",
        "productID": 30000005,
        "userID": 10000005
    },
    {
        "deliveryID": 60000003,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 6,
        "dateDelivered": "25/03/2020",
        "productID": 30000005,
        "userID": 10000007
    },
    {
        "deliveryID": 60000004,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 0,
        "dateDelivered": "13/04/2020",
        "productID": 30000005,
        "userID": 10000002
    },
    {
        "deliveryID": 60000005,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 3,
        "dateDelivered": "05/05/2020",
        "productID": 30000005,
        "userID": 10000019
    },
    {
        "deliveryID": 60000006,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 3,
        "dateDelivered": "22/05/2020",
        "productID": 30000005,
        "userID": 10000018
    },
    {
        "deliveryID": 60000007,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 0,
        "dateDelivered": "11/06/2020",
        "productID": 30000005,
        "userID": 10000014
    },
    {
        "deliveryID": 60000008,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 3,
        "dateDelivered": "06/07/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "deliveryID": 60000009,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 0,
        "dateDelivered": "03/08/2020",
        "productID": 30000005,
        "userID": 10000021
    },
    {
        "deliveryID": 60000010,
        "number_Of_Units_Delivered": 150,
        "number_Of_Damaged": 2,
        "dateDelivered": "24/08/2020",
        "productID": 30000005,
        "userID": 10000024
    }
]

let purchaseData = [{
        "purchaseID": 70000201,
        "amountPaid": 4500,
        "datePurchased": "01/03/2020",
        "totalCost": 45000,
        "managerID": 10000001
    },
    {
        "purchaseID": 70000202,
        "amountPaid": 4500,
        "datePurchased": "16/04/2020",
        "totalCost": 27000,
        "managerID": 10000004
    },
    {
        "purchaseID": 70000203,
        "amountPaid": 4500,
        "datePurchased": "12/05/2020",
        "totalCost": 45000,
        "managerID": 10000002
    },
    {
        "purchaseID": 70000204,
        "amountPaid": 4500,
        "datePurchased": "15/06/2020",
        "totalCost": 36000,
        "managerID": 10000004
    },
    {
        "purchaseID": 70000205,
        "amountPaid": 4500,
        "datePurchased": "27/07/2020",
        "totalCost": 40500,
        "managerID": 10000004
    },
    {
        "purchaseID": 70000001,
        "amountPaid": 100,
        "datePurchased": "01/03/2020",
        "totalCost": 10000,
        "managerID": 10000001
    },
    {
        "purchaseID": 70000002,
        "amountPaid": 100,
        "datePurchased": "11/03/2020",
        "totalCost": 15000,
        "managerID": 10000003
    },
    {
        "purchaseID": 70000003,
        "amountPaid": 100,
        "datePurchased": "25/03/2020",
        "totalCost": 15000,
        "managerID": 10000003
    },
    {
        "purchaseID": 70000004,
        "amountPaid": 100,
        "datePurchased": "13/04/2020",
        "totalCost": 15000,
        "managerID": 10000001
    },
    {
        "purchaseID": 70000005,
        "amountPaid": 100,
        "datePurchased": "05/05/2020",
        "totalCost": 15000,
        "managerID": 10000003
    },
    {
        "purchaseID": 70000006,
        "amountPaid": 100,
        "datePurchased": "22/05/2020",
        "totalCost": 15000,
        "managerID": 10000004
    },
    {
        "purchaseID": 70000007,
        "amountPaid": 100,
        "datePurchased": "11/06/2020",
        "totalCost": 15000,
        "managerID": 10000001
    },
    {
        "purchaseID": 70000008,
        "amountPaid": 100,
        "datePurchased": "06/07/2020",
        "totalCost": 15000,
        "managerID": 10000004
    },
    {
        "purchaseID": 70000009,
        "amountPaid": 100,
        "datePurchased": "03/08/2020",
        "totalCost": 15000,
        "managerID": 10000003
    },
    {
        "purchaseID": 70000010,
        "amountPaid": 100,
        "datePurchased": "24/08/2020",
        "totalCost": 15000,
        "managerID": 10000004
    }
]

let ref_categorydata = [
    { "categoryCode": 101, "productType": "F", "categoryName": "Chairs" },
    { "categoryCode": 102, "productType": "F", "categoryName": "Beds" },
    { "categoryCode": 103, "productType": "F", "categoryName": "Sofas" },
    { "categoryCode": 104, "productType": "F", "categoryName": "Cabinets" },
    { "categoryCode": 105, "productType": "F", "categoryName": "Mirrors" },
    { "categoryCode": 106, "productType": "F", "categoryName": "Drawers" },
    { "categoryCode": 107, "productType": "F", "categoryName": "Closets" },
    { "categoryCode": 108, "productType": "F", "categoryName": "Dining Tables" },
    { "categoryCode": 109, "productType": "F", "categoryName": "Table" },
    { "categoryCode": 110, "productType": "F", "categoryName": "Recliner" },
    { "categoryCode": 111, "productType": "F", "categoryName": "TV stand" },
    { "categoryCode": 201, "productType": "A", "categoryName": "Water heater" },
    { "categoryCode": 202, "productType": "A", "categoryName": "TV" },
    { "categoryCode": 203, "productType": "A", "categoryName": "Electric fan" },
    { "categoryCode": 204, "productType": "A", "categoryName": "Ceiling fan" },
    { "categoryCode": 205, "productType": "A", "categoryName": "Stoves" },
    { "categoryCode": 206, "productType": "A", "categoryName": "Speakers" }
]

let discrepancyData = [{
        "discrepancyID": 90000201,
        "oldCount": 8,
        "newCount": 6,
        "date": "20/03/2020",
        "userID": 10000021,
        "productID": 30000008
    },
    {
        "discrepancyID": 90000202,
        "oldCount": 5,
        "newCount": 4,
        "date": "05/06/2020",
        "userID": 10000008,
        "productID": 30000008
    },
    {
        "discrepancyID": 90000203,
        "oldCount": 6,
        "newCount": 2,
        "date": "28/08/2020",
        "userID": 10000007,
        "productID": 30000008
    },
    {
        "discrepancyID": 90000001,
        "oldCount": 38,
        "newCount": 35,
        "date": "06/03/2020",
        "userID": 10000007,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000002,
        "oldCount": 63,
        "newCount": 58,
        "date": "20/03/2020",
        "userID": 10000009,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000003,
        "oldCount": 129,
        "newCount": 125,
        "date": "27/03/2020",
        "userID": 10000005,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000004,
        "oldCount": 55,
        "newCount": 54,
        "date": "03/04/2020",
        "userID": 10000013,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000004,
        "oldCount": 132,
        "newCount": 127,
        "date": "17/04/2020",
        "userID": 10000019,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000004,
        "oldCount": 17,
        "newCount": 15,
        "date": "01/05/2020",
        "userID": 10000012,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000005,
        "oldCount": 107,
        "newCount": 110,
        "date": "29/05/2020",
        "userID": 10000005,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000006,
        "oldCount": 106,
        "newCount": 102,
        "date": "19/06/2020",
        "userID": 10000015,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000007,
        "oldCount": 19,
        "newCount": 15,
        "date": "03/07/2020",
        "userID": 10000009,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000008,
        "oldCount": 60,
        "newCount": 55,
        "date": "24/07/2020",
        "userID": 10000016,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000008,
        "oldCount": 116,
        "newCount": 115,
        "date": "07/08/2020",
        "userID": 10000002,
        "productID": 30000005
    },
    {
        "discrepancyID": 90000009,
        "oldCount": 26,
        "newCount": 24,
        "date": "21/08/2020",
        "userID": 10000020,
        "productID": 30000005
    }
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