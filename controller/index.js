const fs = require('fs');
const handlebars = require('handlebars');

/* Accessing the models (db) of each class
 */
const userModel = require('../model/users');
const managerModel = require('../model/managers');
const productModel = require('../model/productdb');
const ref_categoryModel = require('../model/ref_categorydb');
const thresholdModel = require('../model/thresholddb');
const salesModel = require('../model/salesdb');
const supplierModel = require('../model/supplierdb');
const discountModel = require('../model/discountdb');
const deliveryModel = require('../model/deliverydb');
const purchaseModel = require('../model/purchasedb');
const discrepanciesModel = require('../model/discrepancies');

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
    this.isSysAd = isSysAd;
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

function Threshold(thresholdID, thresholdType, number, productID, userID) {
    this.thresholdID = thresholdID;
    this.thresholdType = thresholdType;
    this.number = number;
    this.productID = productID;
    this.userID = userID;
}

function Supplier(supplierID, companyName, companyAddress, phoneNum, email) {
    this.supplierID = supplierID;
    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.phoneNum = phoneNum;
    this.email = email;
}

function Ref_Category(categoryCode, categoryName, ProductType) {
    this.categoryCode = categoryCode;
    this.categoryNamee = categoryName;
    this.ProductType = ProductType;
}

function Sales(salesID, quantity, sellingPrice, total, dateSold, productID, userID) {
    this.salesID = salesID;
    this.quantity = quantity;
    this.sellingPrice = sellingPrice;
    this.total = total;
    this.dateSold = dateSold;
    this.productID = productID;
    this.userID = userID;
}

function Discounts(discountID, quantity, sellingPrice, discount, total, dateSold, productID, userID) {
    this.discountID = salesID;
    this.quantity = quantity;
    this.sellingPrice = sellingPrice;
    this.discount = discount;
    this.total = total;
    this.dateSold = dateSold;
    this.productID = productID;
    this.userID = userID;
}

function delivery(deliveryID, number_Of_Units_Delivered, number_Of_Damaged, dateDelivered, productID, userID) {
    this.deliveryID = deliveryID;
    this.number_Of_Units_Delivered = number_Of_Units_Delivered;
    this.number_Of_Damaged = number_Of_Damaged;
    this.dateDelivered = dateDelivered;
    this.productID = productID;
    this.userID = userID;
}

function discrepancies(discrepancyID, oldCount, newCount, date, userID, productID) {
    this.discrepancyID = discrepancyID;
    this.oldCount = oldCount;
    this.newCount = newCount;
    this.date = date;
    this.userID = userID;
    this.productID = productID;
}

function Purchase(purchaseID, amountPaid, datePurchased, totalCost, managerID) {
    this.purchaseID = purchaseID;
    this.amountPaid = amountPaid;
    this.datePurchased = datePurchased;
    this.totalCost = totalCost;
    this.managerID = managerID;
}

const indexFunctions = {
    getDiscrepancy: function(req, res) {
        res.render('a_discrepancy', {
            title: 'View Discrepancies'
        });
    }
};

module.exports = indexFunctions;