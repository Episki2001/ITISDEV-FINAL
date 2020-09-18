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

function discrepancies(discrepancyID, oldCount, newCount, date, userID, productID) {
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

async function currentDate() {
    var today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
                discs: JSON.parse(JSON.stringify(matches))
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

    getAMDgoods: async function(req, res) {
        try {
            var matches = await damagedgoodsModel.find({});
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_MDgoods', {
                title: 'View Missing and Damaged Goods',
                MDgoods: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAnewDelivery: async function(req, res) {
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

    getAnewProducts: async function(req, res) {
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

    getAnewPurchase: async function(req, res) {
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

    getAnewSale: async function(req, res) {
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

    getAdeliveries: async function(req, res) {
        try {
            var matches = await deliveryModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_delivery', {
                title: 'View Deliveries',
                delivery: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },


    getAproducts: async function(req, res) {
        try {
            var matches = await productModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_products', {
                title: 'View Products',
                products: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAoneEditProduct: async function(req, res) {
        try {
            var productID = req.params.productID;
            var match = await productModel.findOne({ productID: productID });
            console.log(match);
            if (match) {
                var supplier = await supplierModel.findOne({ supplierID: match.supplierID });
                var ref_category = await ref_categoryModel.findOne({ categoryCode: match.categoryCode });
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

    getApurchases: async function(req, res) {
        try {
            var matches = await purchaseModel.find({});
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_purchase', {
                title: 'View Purchase',
                purchase: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAsales: async function(req, res) {
        try {
            var matches = await salesModel.find({});
            // console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_sales', {
                title: 'View Sales',
                sales: JSON.parse(JSON.stringify(matches))
            });
        } catch (e) {
            console.log(e);
        }
    },

    getAsuppliers: async function(req, res) {
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

    getAoneSupplier: async function(req, res) {
        try {
            var supplierID = req.params.supplierID;
            var match = await supplierModel.findOne({ supplierID: supplierID });
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

    getAusers: async function(req, res) {
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

    getAmanagers: async function(req, res) {
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
            console.log('Database populated \\o/')
            res.render('a_managers', {
                title: 'View Managers',
                managers: JSON.parse(JSON.stringify(match))
            });
        } catch (err) {
            throw err
        } finally {
            mongoose.connection.close(() => {
                console.log('Disconnected from MongoDB, bye o/')
                process.exit(0)
            })
        }
    },

    postLogin: async function(req, res) {
        var { user, pass } = req.body;
        try {
            var match = await findUser(parseInt(user));
            if (match) {
                bcrypt.compare(pass, match.password, function(err, result) {
                    if (result) {
                        if (match.managerID && match.isSysAd) {
                            //send 201 admin
                            req.session.logUser = match;
                            req.session.type = 'admin';
                            console.log('sending 201' + '. session data: ');
                            console.log(req.session);
                            res.send({ status: 201 });
                        } else if (match.managerID && match.isSysAd == false) {
                            //send 202 manager
                            req.session.logUser = match;
                            req.session.type = 'manager';
                            console.log('sending 202' + '. session data: ');
                            console.log(req.session);
                            res.send({ status: 202 });
                        } else {
                            //send 203 user
                            req.session.logUser = match;
                            req.session.type = 'user';
                            console.log('sending 203' + '. session data: ');
                            console.log(req.session);
                            res.send({ status: 203 });
                        }
                    } else res.send({ status: 401, msg: 'Incorrect password.' });
                });
            } else res.send({ status: 401, msg: 'No user found.' });
        } catch (e) {
            res.send({ status: 500, msg: e });
        }
    },

    getProductDetails: async function(req, res) {
        var prodID = req.params.checkProdID;
        var match = await productModel.findOne({ productID: prodID });
        res.send(match);
    },

    postLogout: function(req, res) {
        console.log(req.session);
        req.session.destroy();
        console.log(req.session);
        res.redirect("/");
    },
    postNewDelivery: async function(req, res) {

        if ( /**session valid */ req.session.logUser /**true */ ) {
            /**IF SESSION IS VALID */
            //get variables
            let { productID, dateDelivered, number_Of_Units_Delivered, number_Of_Damaged } = req.body;
            var deliveryID = await getMinMaxDeliveryID(-1, 1);
            var userID = req.session.logUser.userID;
            //var userID = 101;

            //create new sale
            var delivery = new Delivery(deliveryID, number_Of_Units_Delivered, number_Of_Damaged, dateDelivered, productID, userID);
            var newDelivery = new deliveryModel(delivery);
            //add new delivery to database
            newDelivery.recordNewDelivery();
            //increase products stock
            var product = await productModel.findOne({ productID: productID });
            var newStock = parseInt(product.currentStock) + parseInt(number_Of_Units_Delivered) - parseInt(number_Of_Damaged);
            var result = await productModel.findOneAndUpdate({ productID: product.productID }, { currentStock: newStock });
            //send status
            res.send({ status: 200, msg: 'Delivery Recorded' });
        } else {
            /**IF SESSION IS NOT VALID */
            //alert user of invalid session
            res.send({ status: 500, msg: 'Something went wrong. Sending you back to login' });
            //send back to login
            console.log(req.session);
            req.session.destroy();
            console.log(req.session);
            res.redirect("/");
        }
    },
    postNewSale: async function(req, res) {
        console.log('postNewSale');
        //validate session

        if ( /**session valid */ req.session.logUser /**true */ ) {
            /**IF SESSION IS VALID */
            //get variables
            var { quantity, sellingPrice, total, dateSold, productID } = req.body;
            var salesID = await getMinMaxSalesID(-1, 1);
            var userID = req.session.logUser.userID;
            //var userID = 101;

            //create new sale
            var sale = new Sales(salesID, quantity, sellingPrice, total, dateSold, productID, userID);
            var newSale = new salesModel(sale);
            //add new sale to database
            newSale.recordNewSale();
            //decrease products stock
            var product = await productModel.findOne({ productID: productID });
            var newStock = product.currentStock - quantity;
            var result = await productModel.findOneAndUpdate({ productID: product.productID }, { currentStock: newStock });
            //send status
            res.send({ status: 200, msg: 'Sale Recorded' });
        } else {
            /**IF SESSION IS NOT VALID */
            //alert user of invalid session
            res.send({ status: 500, msg: 'something went wrong sending you back to login' });
            //send back to login
            console.log(req.session);
            req.session.destroy();
            console.log(req.session);
            res.redirect("/");
        }
    },

    postNewUser: async function(req, res) {
        var { fName, lName, birthdate, gender, address, phoneNum, password } = req.body;

        try {
            var userID = await getMinMaxUserID(-1, 1);
            password = bcrypt.hashSync(password, saltRounds);
            var user = new User(userID, password, lName, fName, gender, birthdate, address, phoneNum);
            var newUser = new userModel(user);
            var result = await newUser.recordNewUser();
            if (result)
                res.send({ status: 200, userID });
            else res.send({ status: 401, msg: 'Cannot connect to database' });
        } catch (e) {
            res.send({ status: 500, msg: e });
        }
    },

    postNewProduct: async function(req, res) {
        //check if user is manager or admin
        if (!req.session.logUser)
            res.send({ status: 500, msg: ': User is not logged in' });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var { productName, categoryCode, supplierID, sellingPrice, purchasePrice } = req.body;
                // supplierID = parseInt(supplierID);
                // sellingPrice = parseFloat(sellingPrice);
                // purchasePrice = parseFloat(purchasePrice);
                //get productID of the new Product
                var currentStock = 0;
                var productID = await getMinMaxproductID(-1, 1);
                var product = new Product(productID, productName, currentStock, sellingPrice, purchasePrice, supplierID, categoryCode);
                var newProduct = new productModel(product);
                var result = await newProduct.recordNewProduct();
                console.log(result)
                if (result)
                    res.send({ status: 200, productID });
                else res.send({ status: 401, msg: 'Cannot connect to database' });
            } catch (e) {
                res.send({ status: 500, msg: e });
            }
        } else res.send({ status: 500, msg: ': You must be an admin or manager to post a new product' });

    },

    postEditProduct: async function(req, res) {
        console.log('i am in posteditproduct');
        if (!req.session.logUser)
            res.send({ status: 500, msg: ': User is not logged in' });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var { productID, sellingPrice, purchasePrice } = req.body;
                var product = new Product(productID, '', 0, sellingPrice, purchasePrice, 0, 0);
                console.log(product);
                var editProduct = new productModel(product);
                var result = await editProduct.recordEditProduct();
                console.log(result);
                if (result)
                    res.send({ status: 200, productID });
                else res.send({ status: 401, msg: 'Cannot connect to database' });
            } catch (e) {
                res.send({ status: 500, msg: e });
            }
        } else res.send({ status: 500, msg: ': You must be an admin or manager to edit a product' });
    },

    postNewSupplier: async function(req, res) {
        //check if user is manager or admin
        if (!req.session.logUser)
            res.send({ status: 500, msg: ': User is not logged in' });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var { companyName, companyAddress, email, phoneNum } = req.body;
                var supplierID = await getMinMaxsupplierID(-1, 1);
                // console.log(supplierID);
                // console.log(companyName);
                // console.log(companyAddress);
                // console.log(email);
                // console.log(phoneNum);
                var supplier = new Supplier(supplierID, companyName, companyAddress, phoneNum, email);
                var newSupplier = new supplierModel(supplier);
                var result = await newSupplier.recordNewSupplier();
                console.log(result)
                if (result)
                    res.send({ status: 200, supplierID });
                else res.send({ status: 401, msg: 'Cannot connect to database' });
            } catch (e) {
                res.send({ status: 500, msg: e });
            }
        } else res.send({ status: 500, msg: ': You must be an admin or manager to post a new supplier' });

    },

    postEditSupplier: async function(req, res) {
        if (!req.session.logUser)
            res.send({ status: 500, msg: ': User is not logged in' });
        if (req.session.type == 'admin' || req.session.type == 'manager') {
            try {
                var { supplierID, email, phoneNum } = req.body;
                // console.log(supplierID);
                // console.log(email);
                // console.log(phoneNum);
                var supplier = new Supplier(supplierID, "", "", phoneNum, email);
                // console.log('testing = ' + JSON.stringify(testing));
                var editSupplier = new supplierModel(supplier);
                var result = await editSupplier.recordEditSupplier();
                console.log(result)
                if (result)
                    res.send({ status: 200, supplierID });
                else res.send({ status: 401, msg: 'Cannot connect to database' });
            } catch (e) {
                res.send({ status: 500, msg: e });
            }
        } else res.send({ status: 500, msg: ': You must be an admin or manager to edit a new supplier' });

    }
}
module.exports = indexFunctions;