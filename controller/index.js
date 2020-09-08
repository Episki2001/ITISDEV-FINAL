const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const randtoken = require('rand-token');

/* Accessing the models (db) of each class
 */
const userModel = require('../model/userdb');
const managerModel = require('../model/managerdb');
const productModel = require('../model/productdb');
const ref_categoryModel = require('../model/ref_categorydb');
const thresholdModel = require('../model/thresholddb');
const salesModel = require('../model/salesdb');
const supplierModel = require('../model/supplierdb');
const discountModel = require('../model/discountdb');
const deliveryModel = require('../model/deliverydb');
const purchaseModel = require('../model/purchasedb');
const discrepanciesModel = require('..model/discrepanciesdb');

function User(userID, password, lastName, firstName, gender, birthdate, address, phonenumber, dateHired, datFired) {
    this.userID = userID;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = gender;
    this.birthdate = birthdate;
    this.address = address;
    this.phonenumber = phonenumber;
    this.dateHired = dateHired;
    this.datFired = datFired;
}
function Manager(userID, isSysAd) {
    this.userID = userID;
    this.isSysAd = false;
}
function Product(productID, productName, productType, currentStock, sellingPrice, purchasePrice, sellerID, categoryCode) {
    this.productID = productID;
    this.productName = productName;
    this.productType = productType;
    this.currentStock = currentStock;
    this.sellingPrice = sellingPrice;
    this.purchasePrice = purchasePrice;
    this.sellerID = sellerID;
    this.categoryCode = categoryCode;
}