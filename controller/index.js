const fs = require('fs');
const handlebars = require('handlebars');

/* Accessing the models (db) of each class
 */
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

function User(userID, password, lastName, firstName, gender, birthdate, address, phonenumber, dateHired, dateFired) {
    this.userID = userID;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = gender;
    this.birthdate = birthdate;
    this.address = address;
    this.phonenumber = phonenumber;
    this.dateHired = dateHired;
    this.dateFired = dateFired;
}

function Manager(userID, isSysAd) {
    this.userID = userID;
    this.isSysAd = isSysAd;
}

function Product(productID, productName, currentStock, sellingPrice, purchasePrice, sellerID, categoryCode) {
    this.productID = productID;
    this.productName = productName;
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

function Damaged_Goods(dmgrecordID, dateDamaged, numDamaged, approved, comments, userID, managerID, productID) {
    this.dmgrecordID = dmgrecordID;
    this.dateDamaged = dateDamaged;
    this.numDamaged = numDamaged;
    this.approved = approved;
    this.comments = comments;
    this.userID = userID;
    this.managerID = managerID;
    this.productID = productID;
}

const indexFunctions = {
    getLogin: function(req, res) {
        res.render('login', {
            title: 'Login'
        });
    },

    getAdiscrepancy: async function(req, res) {
        try {
            var matches = await discrepanciesModel.find({});
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_discrepancy', {
                title: 'View Discrepancy',
                discs: [JSON.parse(JSON.stringify(matches))]

            });
        } catch (e) {
            console.log(e);
        }
    },

    getAeditProduct: function(req, res) {
        res.render('a_editProduct', {
            title: 'Edit Product'
        });
    },

    getAeditProfile: function(req, res) {
        res.render('a_editProfile', {
            title: 'Edit Profile'
        });
    },

    getAeditSupplier: function(req, res) {
        res.render('a_editSupplier', {
            title: 'Edit Supplier'
        });
    },

    getAMDgoods: function(req, res) {
        res.render('a_MDgoods', {
            title: 'View Missing/Damaged Goods'
        });
    },

    getAnewProducts: function(req, res) {
        res.render('a_newProducts', {
            title: 'Add Products'
        });
    },

    getAnewSupplier: function(req, res) {
        res.render('a_newSupplier', {
            title: 'Add Supplier'
        });
    },

    getAnewUser: function(req, res) {
        res.render('a_newUser', {
            title: 'Add User'
        });
    },

    getAproducts: function(req, res) {
        res.render('a_products', {
            title: 'View Products'
        });
    },

    getApurchases: function(req, res) {
        res.render('a_purchases', {
            title: 'View Purchases'
        });
    },

    getAsuppliers: function(req, res) {
        res.render('a_suppliers', {
            title: 'View Suppliers'
        });
    },

    getAusers: function(req, res) {
        res.render('a_users', {
            title: 'View Users'
        });
    },

    postLogin: async function(req, res) {
        var { user, pass } = req.body;
        try {
            var user = await userModel.findOne({ user: user });
            if (user) {
                bcrypt.compare(pass, user.password, function(err, result) {
                    if (result) {
                        req.session.logUser = user;
                        res.send({ status: 200 });
                    } else res.send({ status: 401, msg: 'Incorrect password.' });
                });
            } else res.send({ status: 401, msg: 'No user found.' });
        } catch (e) {
            res.send({ status: 500, msg: e });
        }
    }
};

module.exports = indexFunctions;