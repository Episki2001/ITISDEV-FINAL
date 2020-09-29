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
const damagedgoodsModel = require('../model/damagedgoodsdb');

const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

function User(userID, password, lastName, firstName, gender, birthdate, address, phoneNumber) {
    this.userID = userID;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = gender;
    this.birthdate = new Date(birthdate);
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.dateHired = new Date();
}

function Manager(userID, isSysAd) {
    this.userID = userID;
    this.isSysAd = isSysAd;
}

function Product(productID, productName, currentStock, sellingPrice, purchasePrice, supplierID, categoryCode) {
    this.productID = productID;
    this.productName = productName;
    this.currentStock = currentStock;
    this.sellingPrice = sellingPrice;
    this.purchasePrice = purchasePrice;
    this.supplierID = supplierID;
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
    this.dateSold = new Date(dateSold);
    this.productID = productID;
    this.userID = userID;
}

function Discounts(discountID, quantity, sellingPrice, discount, total, dateSold, productID, userID) {
    this.discountID = discountID;
    this.quantity = quantity;
    this.sellingPrice = sellingPrice;
    this.discount = discount;
    this.total = total;
    this.dateSold = dateSold;
    this.productID = productID;
    this.userID = userID;
}

function Delivery(deliveryID, number_Of_Units_Delivered, number_Of_Damaged, dateDelivered, productID, userID) {
    this.deliveryID = deliveryID;
    this.number_Of_Units_Delivered = number_Of_Units_Delivered;
    this.number_Of_Damaged = number_Of_Damaged;
    this.dateDelivered = dateDelivered;
    this.productID = productID;
    this.userID = userID;
}

function Discrepancy(discrepancyID, oldCount, newCount, date, userID, productID) {
    this.discrepancyID = discrepancyID;
    this.oldCount = oldCount;
    this.newCount = newCount;
    this.date = date;
    this.userID = userID;
    this.productID = productID;
}

function Purchase(purchaseID, amountPaid, datePurchased, totalCost, managerID, deliveryID) {
    this.purchaseID = purchaseID;
    this.amountPaid = amountPaid;
    this.datePurchased = datePurchased;
    this.totalCost = totalCost;
    this.managerID = managerID;
    this.deliveryID = deliveryID;
}

function DamagedGoods(dmgrecordID, dateDamaged, numDamaged, approved, comments, userID, managerID, productID) {
    this.dmgrecordID = dmgrecordID;
    this.dateDamaged = dateDamaged;
    this.numDamaged = numDamaged;
    this.approved = approved;
    this.comments = comments;
    this.userID = userID;
    this.managerID = managerID;
    this.productID = productID;
}

async function getMinMaxSalesID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds productID by offset
    var highestID = await salesModel.aggregate([{
        '$sort': {
            'salesID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'salesID': 1
        }
    }]);
    return highestID[0].salesID + offset;
}

async function getMinMaxDeliveryID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds productID by offset
    var highestID = await deliveryModel.aggregate([{
        '$sort': {
            'deliveryID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'deliveryID': 1
        }
    }]);
    return highestID[0].deliveryID + offset;
}


function getUserType(type) {

    if (type == "admin") {
        return 201;
    } else if (type == "manager") {
        return 202;
    } else if (type == "user") {
        return 203;
    }

    return 500;
}

async function getMinMaxUserID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds userad by offset
    var highestID = await userModel.aggregate([{
        '$sort': {
            'userID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'userID': 1
        }
    }]);
    return highestID[0].userID + offset;
}

async function getMinMaxproductID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds productID by offset
    var highestID = await productModel.aggregate([{
        '$sort': {
            'productID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'productID': 1
        }
    }]);
    return highestID[0].productID + offset;
}

async function getMinMaxsupplierID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds productID by offset
    var highestID = await supplierModel.aggregate([{
        '$sort': {
            'supplierID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'supplierID': 1
        }
    }]);
    return highestID[0].supplierID + offset;
}

async function getSupplierReportData(supplierID, fromDate, toDate) {
    return await supplierModel.aggregate(
        [{
            '$lookup': {
                'from': 'products',
                'localField': 'supplierID',
                'foreignField': 'supplierID',
                'as': 'products'
            }
        }, {
            '$match': {
                'supplierID': parseInt(supplierID)
            }
        }, {
            '$unwind': {
                'path': '$products',
                'includeArrayIndex': 'string',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$lookup': {
                'from': 'sales',
                'localField': 'products.productID',
                'foreignField': 'productID',
                'as': 'sales'
            }
        }, {
            '$lookup': {
                'from': 'Delivery',
                'localField': 'products.productID',
                'foreignField': 'productID',
                'as': 'Delivery'
            }
        }, {
            '$lookup': {
                'from': 'Purchases',
                'localField': 'Delivery.deliveryID',
                'foreignField': 'deliveryID',
                'as': 'Purchases'
            }
        }, {
            '$project': {
                'supplierID': 1,
                'companyName': 1,
                'email': 1,
                'products': 1,
                'sales': {
                    '$filter': {
                        'input': '$sales',
                        'as': 'sale',
                        'cond': {
                            '$and': [{
                                '$gte': [
                                    '$$sale.dateSold', new Date(fromDate)
                                ]
                            }, {
                                '$lte': [
                                    '$$sale.dateSold', new Date(toDate)
                                ]
                            }]
                        }
                    }
                },
                'Purchases': {
                    '$filter': {
                        'input': '$Purchases',
                        'as': 'purchase',
                        'cond': {
                            '$and': [{
                                '$gte': [
                                    '$$purchase.datePurchased', new Date(fromDate)
                                ]
                            }, {
                                '$lte': [
                                    '$$purchase.datePurchased', new Date(toDate)
                                ]
                            }]
                        }
                    }
                }
            }
        }]
    );
}

async function getMinMaxdiscrepancyID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds productID by offset
    var highestID = await discrepanciesModel.aggregate([{
        '$sort': {
            'discrepancyID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'discrepancyID': 1
        }
    }]);
    return highestID[0].discrepancyID + offset;
}

async function getMinMaxdmgrecordID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds productID by offset
    var highestID = await damagedgoodsModel.aggregate([{
        '$sort': {
            'dmgrecordID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'dmgrecordID': 1
        }
    }]);
    return highestID[0].dmgrecordID + offset;
}

async function getMinMaxPurchaseID(sortby, offset) {
    //sortby - min = 1, max = -1
    //offset - adds ID by offset
    var highestID = await purchaseModel.aggregate([{
        '$sort': {
            'purchaseID': sortby
        }
    }, {
        '$limit': 1
    }, {
        '$project': {
            'purchaseID': 1
        }
    }]);
    return highestID[0].purchaseID + offset;
}

async function findUser(userID) {
    var user = await userModel.aggregate([{
        '$match': {
            'userID': userID
        }
    }, {
        '$lookup': {
            'from': 'managers',
            'localField': 'userID',
            'foreignField': 'userID',
            'as': 'manager'
        }
    }, {
        '$unwind': {
            'path': '$manager',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$project': {
            'userID': 1,
            'password': 1,
            'lastName': 1,
            'firstName': 1,
            'gender': 1,
            'birthdate': 1,
            'address': 1,
            'phonenumber': 1,
            'dateHired': 1,
            'managerID': '$manager.userID',
            'isSysAd': '$manager.isSysAd'
        }
    }]);
    return user[0];
}

async function getDeliveries() {
    //for new purchases
    return await deliveryModel.aggregate([{
        '$lookup': {
            'from': 'Purchases',
            'localField': 'deliveryID',
            'foreignField': 'deliveryID',
            'as': 'Purchases'
        }
    }, {
        '$unwind': {
            'path': '$Purchases',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$match': {
            'Purchases': null
        }
    }, {
        '$lookup': {
            'from': 'products',
            'localField': 'productID',
            'foreignField': 'productID',
            'as': 'product'
        }
    }, {
        '$unwind': {
            'path': '$product',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$project': {
            'deliveryID': 1,
            'number_Of_Units_Delivered': 1,
            'number_Of_Damaged': 1,
            'productName': '$product.productName'
        }
    }]);
}

async function getDeliveryProdDetails(deliveryID) {
    var result = await deliveryModel.aggregate([{
        '$match': {
            'deliveryID': deliveryID
        }
    }, {
        '$lookup': {
            'from': 'products',
            'localField': 'productID',
            'foreignField': 'productID',
            'as': 'product'
        }
    }, {
        '$unwind': {
            'path': '$product',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$project': {
            'deliveryID': 1,
            'productID': 1,
            'number_Of_Units_Delivered': 1,
            'dateDelivered1': 1,
            'purchasePrice': '$product.purchasePrice'
        }
    }]);
    return result[0];
}

async function getTotalSales(sales) {
    var total = 0;
    for (var i = 0; i < sales.length; i++) {
        total = total + sales[i].total;
    }
    return total;
}
async function getDateDiff(date1, date2) {
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    var dateDiffTime = date2.getTime() - date1.getTime();
    var dateDiffDays = dateDiffTime / (1000 * 3600 * 24);
    return dateDiffDays;
}
async function getTotalAmtPaid(purchases) {
    var total = 0;
    for (var i = 0; i < purchases.length; i++) {
        total = total + purchases[i].totalCost;
    }
    return total;
}
async function createSupplierInfo(supplierReportData, dateDiff) {
    var productID = supplierReportData.products.productID;
    var productName = supplierReportData.products.productName;
    var totalSales = (await getTotalSales(supplierReportData.sales)).toFixed(2);
    var avgDailySales = (totalSales / dateDiff).toFixed(2);
    var totalAmtPaid = (await getTotalAmtPaid(supplierReportData.Purchases)).toFixed(2);
    return {
        productID,
        productName,
        totalSales,
        avgDailySales,
        totalAmtPaid
    };
}

const indexFunctions = {
    getLogin: function (req, res) {
        res.render('login', {
            title: 'Login'
        });
    },

    getAdiscrepancy: async function (req, res) {
        try {
            var matches = await discrepanciesModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'date': 1
                }
            }, {
                '$project': {
                    'discrepancyID': 1,
                    'oldCount': 1,
                    'newCount': 1,
                    'date': 1,
                    'userID': 1,
                    'productID': 1,
                    'firstName': '$user.firstName',
                    'lastName': '$user.lastName'
                }
            }]).sort({
                date: -1
            });
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_discrepancy', {
                title: 'View Discrepancy',
                discs: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },
    getAnewDiscrepancy: async function (req, res) {
        // res.render('a_newDiscrepancy', {
        //     title: 'New Discrepancy'
        // });
        try {
            var products = await productModel.find({});
            // console.log(products);
            res.render('a_newDiscrepancy', {
                title: 'New Discrepancy',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },
    getAeditProduct: function (req, res) {
        res.render('a_editProduct', {
            title: 'Edit Product'
        });
    },
    getAThreshold: function (req, res) {
        res.render('a_threshold', {
            title: 'Threshold'
        });
    },
    getAeditProfile: function (req, res) {
        res.render('a_editProfile', {
            title: 'Edit Profile'
        });
    },
    getSupplierReport: async function (req, res) {
        try {
            var suppliers = await supplierModel.find({});
            res.render('a_supplierReport', {
                title: 'Supplier Report',
                supplier: JSON.parse(JSON.stringify(suppliers)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getSupplierReportDetails: async function (req, res) {
        var supplierID = req.params.productID;
        var fromDate = req.params.fromDate;
        var toDate = req.params.toDate;
        var dateDiff = await getDateDiff(fromDate, toDate);
        console.log(supplierID);
        console.log(fromDate);
        console.log(toDate);
        console.log(dateDiff);
        var supplierReportData = await getSupplierReportData(supplierID, fromDate, toDate);
        var supplierReport = [];
        for (var i = 0; i < supplierReportData.length; i++) {
            supplierReport.push(await createSupplierInfo(supplierReportData[i], dateDiff));
        }
        res.send(supplierReport);
        // try {
        //     console.log(JSON.parse(JSON.stringify(supplierReport)));
        //     res.render('a_supplierReport', {
        //         supplierReportData: supplierReport
        //     });
        // } catch (e) {
        //     console.log(e);
        // }
    },

    getAMDgoods: async function (req, res) {

        try {
            var matches = await damagedgoodsModel.aggregate([{
                    '$match': {
                        'approved': {
                            '$not': {
                                '$eq': null
                            }
                        }
                    }
                },
                {

                    '$lookup': {
                        'from': 'users',
                        'localField': 'userID',
                        'foreignField': 'userID',
                        'as': 'user'
                    }
                }, {
                    '$unwind': {
                        'path': '$user',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'products',
                        'localField': 'productID',
                        'foreignField': 'productID',
                        'as': 'product'
                    }
                }, {
                    '$unwind': {
                        'path': '$product',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'managerID',
                        'foreignField': 'userID',
                        'as': 'manager'
                    }
                }, {
                    '$unwind': {
                        'path': '$manager',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$project': {
                        'dmgrecordID': 1,
                        'dateDamaged': 1,
                        'numDamaged': 1,
                        'approved': 1,
                        'comments': 1,
                        'userID': 1,
                        'productID': 1,
                        'managerID': 1,
                        'productName': '$product.productName',
                        'u_firstName': '$user.firstName',
                        'u_lastName': '$user.lastName',
                        'm_firstName': '$manager.firstName',
                        'm_lastName': '$manager.lastName'
                    }
                }
            ]).sort({
                dateDamaged: -1
            });
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_MDgoods', {
                title: 'View Missing and Damaged Goods',
                MDgoods: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },


    getAnewMDgoods: async function (req, res) {
        try {
            var products = await productModel.find({});
            // console.log(products);
            res.render('a_newMDgoods', {
                title: 'Add Missing/Damaged goods',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAForApprovalMDgoods: async function (req, res) {
        try {
            var matches = await damagedgoodsModel.find({
                approved: null
            });
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_FAMDgoods', {
                title: 'View Missing and Damaged Goods',
                MDgoods: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAoneFAMDGoods: async function (req, res) {
        var dmgrecordID = req.params.dmgrecordID;
        try {
            var record = await damagedgoodsModel.aggregate([{
                '$match': {
                    'dmgrecordID': parseInt(dmgrecordID)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'users'
                }
            }, {
                '$unwind': {
                    'path': '$users',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productID',
                    'foreignField': 'productID',
                    'as': 'products'
                }
            }, {
                '$unwind': {
                    'path': '$products',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'dmgrecordID': 1,
                    'dateDamaged': 1,
                    'numDamaged': 1,
                    'comments': 1,
                    'userID': 1,
                    'productID': 1,
                    'productName': '$products.productName',
                    'firstName': '$users.firstName',
                    'lastName': '$users.lastName'
                }
            }])
            record = record[0];
            console.log(record);
            res.render('a_approveMDgoods', {
                title: 'Approve Damaged Record',
                record: JSON.parse(JSON.stringify(record))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAoneMDGoods: async function (req, res) {
        var dmgrecordID = req.params.dmgrecordID;
        try {
            var record = await damagedgoodsModel.aggregate([{
                '$match': {
                    'dmgrecordID': parseInt(dmgrecordID)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productID',
                    'foreignField': 'productID',
                    'as': 'product'
                }
            }, {
                '$unwind': {
                    'path': '$product',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'managerID',
                    'foreignField': 'userID',
                    'as': 'manager'
                }
            }, {
                '$unwind': {
                    'path': '$manager',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'dmgrecordID': 1,
                    'dateDamaged': 1,
                    'numDamaged': 1,
                    'approved': 1,
                    'comments': 1,
                    'userID': 1,
                    'productID': 1,
                    'managerID': 1,
                    'productName': '$product.productName',
                    'u_firstName': '$user.firstName',
                    'u_lastName': '$user.lastName',
                    'm_firstName': '$manager.firstName',
                    'm_lastName': '$manager.lastName'
                }
            }])
            record = record[0];
            console.log(record);
            res.render('a_MDgoodsDetails', {
                title: 'Missing/Damaged details',
                record: JSON.parse(JSON.stringify(record))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAnewDelivery: async function (req, res) {
        // res.render('a_newDelivery', {
        //     title: 'Add Delivery Details'
        // });
        try {
            var products = await productModel.find({});
            res.render('a_newDelivery', {
                title: 'Add Delivery Details',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAnewProducts: async function (req, res) {
        // res.render('a_newProducts', {
        //     title: 'Add Product'
        // });
        try {
            var matches = await supplierModel.find({});
            var categories = await ref_categoryModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_newProducts', {
                title: 'Add Product',
                suppliers: JSON.parse(JSON.stringify(matches)),
                ref_category: JSON.parse(JSON.stringify(categories))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAnewPurchase: async function (req, res) {
        // res.render('a_newPurchases', {
        //     title: 'Add Purchase'
        // });
        try {
            var delivery = await getDeliveries();
            res.render('a_newPurchases', {
                title: 'Add Purchase',
                delivery: JSON.parse(JSON.stringify(delivery)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAnewSale: async function (req, res) {
        // res.render('a_newSales', {
        //     title: 'Add Sale'
        // });
        try {
            var products = await productModel.find({});
            res.render('a_newSales', {
                title: 'Add Sale',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAnewSupplier: function (req, res) {
        res.render('a_newSupplier', {
            title: 'Add Supplier'
        });
    },

    getAnewUser: function (req, res) {
        res.render('a_newUser', {
            title: 'Add User'
        });
    },


    getAnewManager: async function (req, res) {
        try {
            var users = await userModel.aggregate([{
                '$lookup': {
                    'from': 'managers',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'manager'
                }
            }, {
                '$unwind': {
                    'path': '$manager',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$match': {
                    'manager.userID': null
                }
            }, {
                '$sort': {
                    'userID': 1
                }
            }, {
                '$project': {
                    'userID': 1,
                    'firstName': 1,
                    'lastName': 1
                }
            }])
            res.render('a_newManager', {
                title: 'Add Manager',
                user: JSON.parse(JSON.stringify(users))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAdeliveries: async function (req, res) {
        try {
            var matches = await deliveryModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'date': 1
                }
            }, {
                '$project': {
                    'deliveryID': 1,
                    'number_Of_Units_Delivered': 1,
                    'number_Of_Damaged': 1,
                    'dateDelivered': 1,
                    'productID': 1,
                    'userID': 1,
                    'firstName': '$user.firstName',
                    'lastName': '$user.lastName'
                }
            }]).sort({
                dateDelivered: -1
            });
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_delivery', {
                title: 'View Deliveries',
                delivery: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAproducts: async function (req, res) {
        try {
            var matches = await productModel.aggregate([{
                '$lookup': {
                    'from': 'Supplier',
                    'localField': 'supplierID',
                    'foreignField': 'supplierID',
                    'as': 'supplier'
                }
            }, {
                '$unwind': {
                    'path': '$supplier',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'productID': 1,
                    'productName': 1,
                    'currentStock': 1,
                    'sellingPrice': 1,
                    'purchasePrice': 1,
                    'supplierID': 1,
                    'categoryCode': 1,
                    'supplierName': '$supplier.companyName'
                }
            }]);
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_products', {
                title: 'View Products',
                products: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAoneEditProduct: async function (req, res) {
        try {
            var productID = req.params.productID;
            var match = await productModel.findOne({
                productID: productID
            });
            console.log(match);
            if (match) {
                var supplier = await supplierModel.findOne({
                    supplierID: match.supplierID
                });
                var ref_category = await ref_categoryModel.findOne({
                    categoryCode: match.categoryCode
                });
                res.render('a_editProduct', {
                    title: 'Edit ' + match.productName,
                    product: JSON.parse(JSON.stringify(match)),
                    supplier: JSON.parse(JSON.stringify(supplier)),
                    ref_category: JSON.parse(JSON.stringify(ref_category))
                });
            } else res.render('error', {
                title: 'Error',
                msg: 'Product does not exist'
            });
        } catch (e) {
            console.log(e);
        }
    },

    getApurchases: async function (req, res) {
        try {
            var matches = await purchaseModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'managerID',
                    'foreignField': 'userID',
                    'as': 'manager'
                }
            }, {
                '$unwind': {
                    'path': '$manager',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'date': 1
                }
            }, {
                '$project': {
                    'purchaseID': 1,
                    'amountPaid': 1,
                    'datePurchased': 1,
                    'totalCost': 1,
                    'managerID': 1,
                    'deliveryID': 1,
                    'firstName': '$manager.firstName',
                    'lastName': '$manager.lastName'
                }
            }]).sort({
                datePurchased: -1
            });
            
            res.render('a_purchase', {
                title: 'View Purchase',
                purchase: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAsales: async function (req, res) {
        try {
            var matches = await salesModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'dateSold': 1
                }
            }, {
                '$project': {
                    'salesID': 1,
                    'quantity': 1,
                    'sellingPrice': 1,
                    'total': 1,
                    'dateSold': 1,
                    'productID': 1,
                    'userID': 1,
                    'firstName': '$user.firstName',
                    'lastName': '$user.lastName'
                }
            }]).sort({
                dateSold: -1
            });
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_sales', {
                title: 'View Sales',
                sales: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAsuppliers: async function (req, res) {
        try {
            var matches = await supplierModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_suppliers', {
                title: 'View Suppliers',
                suppliers: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAoneSupplier: async function (req, res) {
        try {
            var supplierID = req.params.supplierID;
            var match = await supplierModel.findOne({
                supplierID: supplierID
            });
            console.log(match);
            if (match) {
                res.render('a_editSupplier', {
                    title: match.companyName,
                    supplier: JSON.parse(JSON.stringify(match))
                });
            } else res.render('error', {
                title: 'Error',
                msg: 'Supplier does not exist'
            });
        } catch (e) {
            console.log(e)
        }
    },

    getAusers: async function (req, res) {
        try {
            var matches = await userModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_users', {
                title: 'View users',
                users: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAmanagers: async function (req, res) {
        try {
            var match = await managerModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'string'
                }
            }, {
                '$unwind': {
                    'path': '$string'
                }
            }, {
                '$project': {
                    'userID': 1,
                    'isSysAd': 1,
                    'firstName': '$string.firstName',
                    'lastName': '$string.lastName',
                    'phoneNumber': '$string.phoneNumber'
                }

            }])
            console.log(JSON.parse(JSON.stringify(match)));
            res.render('a_managers', {
                title: 'View Managers',
                managers: JSON.parse(JSON.stringify(match))
            });
        } catch (e) {
            console.log(e);
        }
    },

    postLogin: async function (req, res) {
        var {
            user,
            pass
        } = req.body;
        try {
            var match = await findUser(parseInt(user));
            if (match) {
                bcrypt.compare(pass, match.password, function (err, result) {
                    if (result) {
                        if (match.managerID && match.isSysAd) {
                            //send 201 admin
                            req.session.logUser = match;
                            req.session.type = 'admin';
                            console.log('sending 201' + '. session data: ');
                            console.log(req.session);
                            res.send({
                                status: 201
                            });
                        } else if (match.managerID && match.isSysAd == false) {
                            //send 202 manager
                            req.session.logUser = match;
                            req.session.type = 'manager';
                            console.log('sending 202' + '. session data: ');
                            console.log(req.session);
                            res.send({
                                status: 202
                            });
                        } else {
                            //send 203 user
                            req.session.logUser = match;
                            req.session.type = 'user';
                            console.log('sending 203' + '. session data: ');
                            console.log(req.session);
                            res.send({
                                status: 203
                            });
                        }
                    } else res.send({
                        status: 401,
                        msg: 'Incorrect password.'
                    });
                });
            } else res.send({
                status: 401,
                msg: 'No user found.'
            });
        } catch (e) {
            res.send({
                status: 500,
                msg: e
            });
        }
    },

    getProductDetails: async function (req, res) {
        var prodID = req.params.checkProdID;
        var match = await productModel.findOne({
            productID: prodID
        });
        res.send(match);
    },

    postLogout: function (req, res) {
        console.log(req.session);
        req.session.destroy();
        console.log(req.session);
        res.redirect("/");
    },
    postNewDelivery: async function (req, res) {

        if ( /**session valid */ req.session.logUser /**true */ ) {
            /**IF SESSION IS VALID */
            //get variables
            let {
                productID,
                dateDelivered,
                number_Of_Units_Delivered,
                number_Of_Damaged
            } = req.body;
            var deliveryID = await getMinMaxDeliveryID(-1, 1);
            var userID = req.session.logUser.userID;
            var userStatus = getUserType(req.session.type);
            //var userID = 101;

            //create new sale
            var delivery = new Delivery(deliveryID, number_Of_Units_Delivered, number_Of_Damaged, dateDelivered, productID, userID);
            var newDelivery = new deliveryModel(delivery);
            //add new delivery to database
            newDelivery.recordNewDelivery();
            //increase products stock
            var product = await productModel.findOne({
                productID: productID
            });
            var newStock = parseInt(product.currentStock) + parseInt(number_Of_Units_Delivered) - parseInt(number_Of_Damaged);
            var result = await productModel.findOneAndUpdate({
                productID: product.productID
            }, {
                currentStock: newStock
            });
            //send status
            res.send({
                status: userStatus,
                msg: 'Delivery Recorded'
            });
        } else {
            /**IF SESSION IS NOT VALID */
            //alert user of invalid session
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
            //send back to login
            
        }
    },
    postNewSale: async function (req, res) {
        console.log('postNewSale');
        //validate session

        if ( /**session valid */ req.session.logUser /**true */ ) {
            /**IF SESSION IS VALID */
            //get variables
            var {
                quantity,
                sellingPrice,
                total,
                dateSold,
                productID
            } = req.body;
            var salesID = await getMinMaxSalesID(-1, 1);
            var userID = req.session.logUser.userID;
            //var userID = 101;

            //create new sale
            var sale = new Sales(salesID, quantity, sellingPrice, total, dateSold, productID, userID);
            var newSale = new salesModel(sale);
            //add new sale to database
            newSale.recordNewSale();
            //decrease products stock
            var product = await productModel.findOne({
                productID: productID
            });
            var newStock = product.currentStock - quantity;
            var result = await productModel.findOneAndUpdate({
                productID: product.productID
            }, {
                currentStock: newStock
            });
            //send status
            status = getUserType(req.session.type);
            console.log(status);
            res.send({
                status: status,
                msg: 'Sale Recorded'
            });
        } else {
            /**IF SESSION IS NOT VALID */
            //alert user of invalid session
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
            //send back to login
            
        }
    },
    postNewDiscrepancy: async function (req, res) {
        console.log('postNewDiscrepancy');

        if ( /**session valid */ req.session.logUser /**true */ ) {
            /**IF SESSION IS VALID */
            //get variables
            var {
                oldCount,
                newCount,
                productID
            } = req.body;
            var discrepancyID = await getMinMaxdiscrepancyID(-1, 1);
            var userID = req.session.logUser.userID;
            var date = new Date();
            var userStatus = getUserType(req.session.type);
            //var userID = 101;

            //create new discrepancy
            var discrepancy = new Discrepancy(discrepancyID, oldCount, newCount, date, userID, productID);
            var newdiscrepancy = new discrepanciesModel(discrepancy);
            //add new discrepancy to database
            newdiscrepancy.recordNewDiscrepancy();
            //decrease products stock
            var product = await productModel.findOne({
                productID: productID
            });
            var newStock = newCount;
            var result = await productModel.findOneAndUpdate({
                productID: product.productID
            }, {
                currentStock: newStock
            });
            //send status
            res.send({
                status: userStatus,
                msg: 'Discrepancy Recorded'
            });
        } else {
            /**IF SESSION IS NOT VALID */
            //alert user of invalid session
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
            //send back to login
            
        }
    },
    postNewUser: async function (req, res) {
        var {
            fName,
            lName,
            birthdate,
            gender,
            address,
            phoneNum,
            password
        } = req.body;

        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });

        try {
            var userID = await getMinMaxUserID(-1, 1);
            password = bcrypt.hashSync(password, saltRounds);
            var user = new User(userID, password, lName, fName, gender, birthdate, address, phoneNum);
            var newUser = new userModel(user);
            var result = await newUser.recordNewUser();
            if (result)
                res.send({
                    status: 200,
                    userID
                });
            else res.send({
                status: 401,
                msg: 'Cannot connect to database'
            });
        } catch (e) {
            res.send({
                status: 500,
                msg: e
            });
        }
    },

    postNewManager: async function (req, res) {
        var {
            userID,
            isSysAd
        } = req.body;
        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        if (req.session.type == 'admin') {
            try {
                var manager = new Manager(userID, isSysAd);
                var newManager = new managerModel(manager);
                var result = await newManager.recordNewManager();
                if (result)
                    res.send({
                        status: 201,
                        userID
                    });
                else res.send({
                    status: 401,
                    msg: 'Cannot connect to database'
                });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        } else res.send({
            status: 500,
            msg: ': You must be an admin or manager to post a new product'
        });
    },

    postNewProduct: async function (req, res) {
        //check if user is manager or admin
        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var {
                    productName,
                    categoryCode,
                    supplierID,
                    sellingPrice,
                    purchasePrice
                } = req.body;
                // supplierID = parseInt(supplierID);
                // sellingPrice = parseFloat(sellingPrice);
                // purchasePrice = parseFloat(purchasePrice);
                //get productID of the new Product
                var currentStock = 0;
                var productID = await getMinMaxproductID(-1, 1);
                var product = new Product(productID, productName, currentStock, sellingPrice, purchasePrice, supplierID, categoryCode);
                var newProduct = new productModel(product);
                var result = await newProduct.recordNewProduct();
                var userStatus = getUserType(req.session.type);
                console.log(result)
                if (result)
                    res.send({
                        status: userStatus,
                        productID
                    });
                else res.send({
                    status: 401,
                    msg: 'Cannot connect to database'
                });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        } else res.send({
            status: 500,
            msg: ': You must be an admin or manager to post a new product'
        });

    },

    postEditProduct: async function (req, res) {
        console.log('i am in posteditproduct');
        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var {
                    productID,
                    sellingPrice,
                    purchasePrice
                } = req.body;
                var product = new Product(productID, '', 0, sellingPrice, purchasePrice, 0, 0);
                console.log(product);
                var editProduct = new productModel(product);
                var result = await editProduct.recordEditProduct();
                var userStatus = getUserType(req.session.type);
                console.log(result);
                if (result)
                    res.send({
                        status: userStatus,
                        supplierID
                    });
                else res.send({
                    status: 401,
                    msg: 'Cannot connect to database'
                });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        } else res.send({
            status: 500,
            msg: ': You must be an admin or manager to edit a new supplier'
        });

    },
    postNewSupplier: async function (req, res) {
        //check if user is manager or admin
        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var {
                    companyName,
                    companyAddress,
                    email,
                    phoneNum
                } = req.body;
                var supplierID = await getMinMaxsupplierID(-1, 1);
                // console.log(supplierID);
                // console.log(companyName);
                // console.log(companyAddress);
                // console.log(email);
                // console.log(phoneNum);
                var supplier = new Supplier(supplierID, companyName, companyAddress, phoneNum, email);
                var newSupplier = new supplierModel(supplier);
                var result = await newSupplier.recordNewSupplier();
                var userStatus = getUserType(req.session.type);
                console.log(result);
                if (result)
                    res.send({
                        status: userStatus,
                        supplierID
                    });
                else res.send({
                    status: 401,
                    msg: 'Cannot connect to database'
                });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        } else res.send({
            status: 500,
            msg: ': You must be an admin or manager to post a new supplier'
        });

    },

    postNewMDgoods: async function (req, res) {

        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        else {
            try {
                var {
                    productID,
                    numDamaged,
                    comments
                } = req.body;
                var dmgrecordID = await getMinMaxdmgrecordID(-1, 1);
                var date = new Date();
                var userID = req.session.logUser.userID;
                var approved = null;
                var managerID = null;
                if (req.session.type == 'admin' || req.session.type == 'manager') {
                    approved = true;
                    managerID = userID;
                }

                var MDgoods = new DamagedGoods(dmgrecordID, date, numDamaged, approved, comments, userID, managerID, productID);
                var newMDgoods = new damagedgoodsModel(MDgoods);
                var result = await newMDgoods.recordNewMDgoods();
                var userStatus = getUserType(req.session.type);

                console.log(result);

                if (managerID && result) {
                    var product = await productModel.findOne({
                        productID: productID
                    });
                    var newStock = parseInt(product.currentStock) - parseInt(numDamaged);
                    var resultUpdate = await productModel.findOneAndUpdate({
                        productID: productID
                    }, {
                        currentStock: newStock
                    });
                }

                if (result) {
                    if (resultUpdate) {
                        res.send({
                            status: userStatus,
                            msg: 'Missing/Damaged goods approved'
                        });
                    } else
                        res.send({
                            status: userStatus,
                            msg: 'Missing/Damaged goods recorded'
                        });
                } else
                    res.send({
                        status: 401,
                        msg: 'cannot connect to database'
                    });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        }
    },
    postApprovalMDGoods: async function (req, res) {
        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ' : User is not logged in'
            });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var {
                    approved,
                    dmgrecordID,
                    productID,
                    numDamaged
                } = req.body;
                var userID = req.session.logUser.userID;
                var dmgrecord = new DamagedGoods(dmgrecordID, null, null, approved, null, null, userID, null);
                // console.log('testing = ' + JSON.stringify(testing));
                var approveMDGoods = new damagedgoodsModel(dmgrecord);
                var result = await approveMDGoods.recordApproval();
                var msg = 'Damaged Goods successfully rejected';
                console.log(result);
                if (approved == 'true') {
                    var product = await productModel.findOne({
                        productID: productID
                    });
                    var newStock = parseInt(product.currentStock) - parseInt(numDamaged);
                    var result = await productModel.findOneAndUpdate({
                        productID: product.productID
                    }, {
                        currentStock: newStock
                    });
                    msg = 'Damaged Goods succesfully Approved';
                    console.log(result);
                }


                var userStatus = getUserType(req.session.type);
                console.log(result)
                if (result)
                    res.send({
                        status: userStatus,
                        msg: msg
                    });
                else res.send({
                    status: 401,
                    msg: 'Cannot connect to database'
                });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        } else res.send({
            status: 500,
            msg: ': You must be an admin or manager to approve'
        });
    },
    postEditSupplier: async function (req, res) {
        if (!req.session.logUser)
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var {
                    supplierID,
                    email,
                    phoneNum
                } = req.body;
                // console.log(supplierID);
                // console.log(email);
                // console.log(phoneNum);
                var supplier = new Supplier(supplierID, "", "", phoneNum, email);
                // console.log('testing = ' + JSON.stringify(testing));
                var editSupplier = new supplierModel(supplier);
                var result = await editSupplier.recordEditSupplier();
                var userStatus = getUserType(req.session.type);
                console.log(result)
                if (result)
                    res.send({
                        status: userStatus,
                        supplierID
                    });
                else res.send({
                    status: 401,
                    msg: 'Cannot connect to database'
                });
            } catch (e) {
                res.send({
                    status: 500,
                    msg: e
                });
            }
        } else res.send({
            status: 500,
            msg: ': You must be an admin or manager to edit a new supplier'
        });

    },
    calculateTotalCost: async function (req, res) {
        var deliveryID = req.params.deliveryID;
        var result = await getDeliveryProdDetails(parseInt(deliveryID));
        var totalCost = result.purchasePrice * result.number_Of_Units_Delivered
        res.send({
            status: 200,
            amount: totalCost
        });
    },
    postNewPurchase: async function (req, res) {
        /**VERIFY SESSION ID IF MANAGER */
        if (!req.session.logUser) {
            res.send({
                status: 500,
                msg: ': User is not logged in'
            });
        } else {
            var userID = req.session.logUser.userID;
            var userStatus = getUserType(req.session.type);
            console.log(userID);
        }

        if (req.session.type == 'manager' || req.session.type == 'admin') {
            /**GET VARIABLES */
            var {
                deliveryID,
                datePaid,
                amountPaid,
                totalCost
            } = req.body;
            // CREATE NEW PURHCASE ID
            var purchaseID = await getMinMaxPurchaseID(-1, 1);
            /**RECORD PURCHASE */
            var purchase = new Purchase(purchaseID, amountPaid, datePaid, totalCost, userID, deliveryID);
            var newPurchase = new purchaseModel(purchase);
            await newPurchase.recordNewPurchase();
            console.log('result: ' + newPurchase);
            res.send({
                status: userStatus,
                purchase: newPurchase
            });
        } else {
            res.send({
                status: 500,
                msg: 'Please log in as a manager'
            });
        }
    },

    //MANAGERS
    getMproducts: async function (req, res) {
        try {
            var matches = await productModel.aggregate([{
                '$lookup': {
                    'from': 'Supplier',
                    'localField': 'supplierID',
                    'foreignField': 'supplierID',
                    'as': 'supplier'
                }
            }, {
                '$unwind': {
                    'path': '$supplier',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'productID': 1,
                    'productName': 1,
                    'currentStock': 1,
                    'sellingPrice': 1,
                    'purchasePrice': 1,
                    'supplierID': 1,
                    'categoryCode': 1,
                    'supplierName': '$supplier.companyName'
                }
            }]);
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('m_products', {
                title: 'View Products',
                products: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMoneEditProduct: async function (req, res) {
        try {
            var productID = req.params.productID;
            var match = await productModel.findOne({
                productID: productID
            });
            console.log(match);
            if (match) {
                var supplier = await supplierModel.findOne({
                    supplierID: match.supplierID
                });
                var ref_category = await ref_categoryModel.findOne({
                    categoryCode: match.categoryCode
                });
                res.render('m_editProduct', {
                    title: 'Edit ' + match.productName,
                    product: JSON.parse(JSON.stringify(match)),
                    supplier: JSON.parse(JSON.stringify(supplier)),
                    ref_category: JSON.parse(JSON.stringify(ref_category))
                });
            } else res.render('error', {
                title: 'Error',
                msg: 'Product does not exist'
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMnewProducts: async function (req, res) {
        try {
            var matches = await supplierModel.find({});
            var ref_category = await ref_categoryModel.find({});
            res.render('m_newProducts', {
                title: 'Add product',
                suppliers: JSON.parse(JSON.stringify(matches)),
                ref_category: JSON.parse(JSON.stringify(ref_category))

            });
        } catch (e) {
            console.log(e)
        }
    },

    getMsupplier: async function (req, res) {
        try {
            var matches = await supplierModel.find({});
            res.render('m_suppliers', {
                title: 'View Suppliers',
                suppliers: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMoneSupplier: async function (req, res) {
        try {
            var supplierID = req.params.supplierID;
            var match = await supplierModel.findOne({
                supplierID: supplierID
            });
            console.log(match);
            if (match) {
                res.render('m_editSupplier', {
                    title: match.companyName,
                    supplier: JSON.parse(JSON.stringify(match))
                });
            } else res.render('error', {
                title: 'Error',
                msg: 'Supplier does not exist'
            });
        } catch (e) {
            console.log(e)
        }
    },

    getMnewSupplier: function (req, res) {
        res.render('m_newSupplier', {
            title: 'Add Supplier'
        });
    },

    getMpurchases: async function (req, res) {
        try {
            var matches = await purchaseModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'managerID',
                    'foreignField': 'userID',
                    'as': 'manager'
                }
            }, {
                '$unwind': {
                    'path': '$manager',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'date': 1
                }
            }, {
                '$project': {
                    'purchaseID': 1,
                    'amountPaid': 1,
                    'datePurchased': 1,
                    'totalCost': 1,
                    'managerID': 1,
                    'deliveryID': 1,
                    'firstName': '$manager.firstName',
                    'lastName': '$manager.lastName'
                }
            }]).sort({
                datePurchased: -1
            });
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('m_purchases', {
                title: 'View Purchase',
                purchase: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMnewPurchase: async function (req, res) {
        // res.render('a_newPurchases', {
        //     title: 'Add Purchase'
        // });
        try {
            var delivery = await getDeliveries();
            res.render('m_newPurchases', {
                title: 'Add Purchase',
                delivery: JSON.parse(JSON.stringify(delivery)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMdeliveries: async function (req, res) {
        try {
            var matches = await deliveryModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'date': 1
                }
            }, {
                '$project': {
                    'deliveryID': 1,
                    'number_Of_Units_Delivered': 1,
                    'number_Of_Damaged': 1,
                    'dateDelivered': 1,
                    'productID': 1,
                    'userID': 1,
                    'firstName': '$user.firstName',
                    'lastName': '$user.lastName'
                }
            }]).sort({
                dateDelivered: -1
            });
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('m_delivery', {
                title: 'View Deliveries',
                delivery: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMnewDelivery: async function (req, res) {
        // res.render('a_newDelivery', {
        //     title: 'Add Delivery Details'
        // });
        try {
            var products = await productModel.find({});
            res.render('m_newDelivery', {
                title: 'Add Delivery Details',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMsales: async function (req, res) {
        try {
            var matches = await salesModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'dateSold': 1
                }
            }, {
                '$project': {
                    'salesID': 1,
                    'quantity': 1,
                    'sellingPrice': 1,
                    'total': 1,
                    'dateSold': 1,
                    'productID': 1,
                    'userID': 1,
                    'firstName': '$user.firstName',
                    'lastName': '$user.lastName'
                }
            }]).sort({
                dateSold: -1
            });
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('m_sales', {
                title: 'View Sales',
                sales: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMnewSale: async function (req, res) {
        // res.render('a_newSales', {
        //     title: 'Add Sale'
        // });
        try {
            var products = await productModel.find({});
            res.render('m_newSales', {
                title: 'Add Sale',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMMDgoods: async function (req, res) {
        try {
            var matches = await damagedgoodsModel.aggregate([{
                '$match': {
                    'approved': {
                        '$not': {
                            '$eq': null
                        }
                    }
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productID',
                    'foreignField': 'productID',
                    'as': 'product'
                }
            }, {
                '$unwind': {
                    'path': '$product',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'managerID',
                    'foreignField': 'userID',
                    'as': 'manager'
                }
            }, {
                '$unwind': {
                    'path': '$manager',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'dmgrecordID': 1,
                    'dateDamaged': 1,
                    'numDamaged': 1,
                    'approved': 1,
                    'comments': 1,
                    'userID': 1,
                    'productID': 1,
                    'managerID': 1,
                    'productName': '$product.productName',
                    'u_firstName': '$user.firstName',
                    'u_lastName': '$user.lastName',
                    'm_firstName': '$manager.firstName',
                    'm_lastName': '$manager.lastName'
                }
            }]).sort({
                dateDamaged: -1
            });
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('m_MDgoods', {
                title: 'View Missing and Damaged Goods',
                MDgoods: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMoneMDGoods: async function (req, res) {
        var dmgrecordID = req.params.dmgrecordID;
        try {
            var record = await damagedgoodsModel.aggregate([{
                '$match': {
                    'dmgrecordID': parseInt(dmgrecordID)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productID',
                    'foreignField': 'productID',
                    'as': 'product'
                }
            }, {
                '$unwind': {
                    'path': '$product',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'managerID',
                    'foreignField': 'userID',
                    'as': 'manager'
                }
            }, {
                '$unwind': {
                    'path': '$manager',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'dmgrecordID': 1,
                    'dateDamaged': 1,
                    'numDamaged': 1,
                    'approved': 1,
                    'comments': 1,
                    'userID': 1,
                    'productID': 1,
                    'managerID': 1,
                    'productName': '$product.productName',
                    'u_firstName': '$user.firstName',
                    'u_lastName': '$user.lastName',
                    'm_firstName': '$manager.firstName',
                    'm_lastName': '$manager.lastName'
                }
            }])
            record = record[0];
            console.log(record);
            res.render('m_MDgoodsDetails', {
                title: 'Missing/Damaged details',
                record: JSON.parse(JSON.stringify(record))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMnewMDgoods: async function (req, res) {
        try {
            var products = await productModel.find({});
            // console.log(products);
            res.render('m_newMDgoods', {
                title: 'Add Missing/Damaged goods',
                product: JSON.parse(JSON.stringify(products)),
            });
        } catch (e) {
            console.log(e);
        }
    },

    getMdiscrepancy: async function (req, res) {
        try {
            var matches = await discrepanciesModel.aggregate([{
                '$lookup': {
                    'from': 'users',
                    'localField': 'userID',
                    'foreignField': 'userID',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$sort': {
                    'date': 1
                }
            }, {
                '$project': {
                    'discrepancyID': 1,
                    'oldCount': 1,
                    'newCount': 1,
                    'date': 1,
                    'userID': 1,
                    'productID': 1,
                    'firstName': '$user.firstName',
                    'lastName': '$user.lastName'
                }
            }]).sort({
                date: -1
            });
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('m_discrepancy', {
                title: 'View Discrepancy',
                discs: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    //USERS
    getUproducts: async function (req, res) {
        try {
            var matches = await productModel.aggregate([{
                '$lookup': {
                    'from': 'Supplier',
                    'localField': 'supplierID',
                    'foreignField': 'supplierID',
                    'as': 'supplier'
                }
            }, {
                '$unwind': {
                    'path': '$supplier',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'productID': 1,
                    'productName': 1,
                    'currentStock': 1,
                    'sellingPrice': 1,
                    'purchasePrice': 1,
                    'supplierID': 1,
                    'categoryCode': 1,
                    'supplierName': '$supplier.companyName'
                }
            }]);
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('u_products', {
                title: 'View Products',
                products: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getUoneViewProduct: async function (req, res) {
        try {
            var productID = req.params.productID;
            var match = await productModel.findOne({
                productID: productID
            });
            console.log(match);
            if (match) {
                var supplier = await supplierModel.findOne({
                    supplierID: match.supplierID
                });
                var ref_category = await ref_categoryModel.findOne({
                    categoryCode: match.categoryCode
                });
                res.render('u_productDetails', {
                    title: 'View ' + match.productName,
                    product: JSON.parse(JSON.stringify(match)),
                    supplier: JSON.parse(JSON.stringify(supplier)),
                    ref_category: JSON.parse(JSON.stringify(ref_category))
                });
            } else res.render('error', {
                title: 'Error',
                msg: 'Product does not exist'
            });
        } catch (e) {
            console.log(e);
        }
    },

    getUsuppliers: async function (req, res) {
        try {
            var matches = await supplierModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('u_suppliers', {
                title: 'View Suppliers',
                suppliers: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getUnewSale: async function (req, res) {
        // res.render('a_newSales', {
        //     title: 'Add Sale'
        // });
        try {
            var products = await productModel.find({});
            res.render('u_newSales', {
                title: 'Add Sale',
                product: JSON.parse(JSON.stringify(products))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getUnewMDgoods: async function (req, res) {
        try {
            var products = await productModel.find({});
            res.render('u_newMDgoods', {
                title: 'Add Missing/Damaged goods',
                product: JSON.parse(JSON.stringify(products))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getUnewDiscrepancy: async function (req, res) {
        try {
            var products = await productModel.find({});
            res.render('u_newDiscrepancy', {
                title: 'Add Discrepancy',
                product: JSON.parse(JSON.stringify(products))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getUnewDelivery: async function (req, res) {
        try {
            var products = await productModel.find({});
            res.render('u_newDelivery', {
                title: 'Add delivery details',
                product: JSON.parse(JSON.stringify(products))
            });
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = indexFunctions;