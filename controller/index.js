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
    this.discountID = discountID;
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

    getAeditSupplier: function(req, res) {
        res.render('a_editSupplier', {
            title: 'Edit Supplier'
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

    getAnewDelivery: function(req, res) {
        res.render('a_newDelivery', {
            title: 'Add Delivery Details'
        });
    },

    getAnewProducts: function(req, res) {
        res.render('a_newProducts', {
            title: 'Add Product'
        });
    },

    getAnewPurchase: function(req, res) {
        res.render('a_newPurchases', {
            title: 'Add Purchase'
        });
    },

    getAnewSale: function(req, res) {
        res.render('a_newSales', {
            title: 'Add Sale'
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

    getAdeliveries: async function(req, res) {
        try {
            var matches = await deliveryModel.find({});
            console.log(JSON.parse(JSON.stringify(matches)));
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
            console.log(JSON.parse(JSON.stringify(matches)));
            res.render('a_products', {
                title: 'View Products',
                products: JSON.parse(JSON.stringify(matches))
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
            console.log(JSON.parse(JSON.stringify(matches)));
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

    getAusers: async function(req, res) {
        try {
            var matches = await userModel.find({});
            console.log(JSON.parse(JSON.stringify(matches)));
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

        // try {
        //     var match = await userModel.findOne({ userID: user });      -->  somehow messing up res.send
        //     if (true) {
        //         if (true) {
        //             res.send({ status: 200 });
        //         } else res.send({ status: 401, msg: 'Incorrect password.' });
        //     } else res.send({ status: 401, msg: 'No user found.' });
        // } catch (e) {
        //     res.send({ status: 500, msg: e });
        // }

        try {
            var match = await userModel.findOne({ userID: user });
            if (match) {
                bcrypt.compare(pass, match.pass, function(err, result) {
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