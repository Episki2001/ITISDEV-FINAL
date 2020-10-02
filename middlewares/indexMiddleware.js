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

const indexMiddleware = {
    validateNewSale: async function(req, res, next) {
        // NEW SALE: check productID, quantity, and dateSold
        let {
            productID,
            quantity,
            dateSold
        } = req.body;
        let product = await productModel.findOne({
            productID: productID
        });
        var today = new Date();
        var saleDate = new Date(dateSold);
        /**
         * if   product == null
         * if   quantity > product.currentStock
         * if   dateSold > currentDate
         * then return next()
         * else res.send msg validation failed
         *   || 
         */
        // console.log(product == null);
        // console.log(parseInt(quantity) % 1 != 0 || parseInt(quantity) > parseInt(product.currentStock));
        // console.log(today);
        // console.log(saleDate);
        // console.log(today < saleDate);
        try {
            if (product == null) {
                /**check if productID is in db */
                res.send({
                    status: 401,
                    msg: 'no product with matching productID found'
                });
            } else if (parseInt(quantity) > parseInt(product.currentStock)) {
                /**check if quantity is less than or equal to stock */
                res.send({
                    status: 401,
                    msg: 'quantity cannot be more than the current stock of the product'
                });
            } else if (today < saleDate) {
                /**check if date is valid*/
                res.send({
                    status: 401,
                    msg: 'date sold cannot be after today'
                });
            } else
                return next();
        } catch (e) {
            res.send({
                status: 500,
                msg: 'Server error. Could not validate.'
            });
        }
    },
    validateNewDelivery: async function(req, res, next) {
        try {
            console.log('i am here');
            var productID = req.body.productID;
            console.log(productID);
            console.log('in validate delivery');
            var product = await productModel.findOne({
                productID: productID
            });
            console.log(product);
            if (product)
                return next();
            else
                res.send({
                    status: 401,
                    msg: ': Product not found'
                });

        } catch (e) {
            res.send({
                status: 500,
                msg: 'Server error. Could not validate'
            });
        }
    },

    validateNewDiscrepancy: async function(req, res, next) {
        let {
            productID,
            newCount,
            oldCount
        } = req.body;
        let product = await productModel.findOne({
            productID: productID
        });

        try {
            if (product == null) {
                res.send({
                    status: 401,
                    msg: 'no product with matching product ID found'
                });

            } else if (product.currentStock == parseInt(newCount)) {
                res.send({
                    status: 401,
                    msg: 'Old count and current stock do not match, please press check again'
                });

            } else if (product.currentStock != parseInt(oldCount)) {
                res.send({
                    status: 401,
                    msg: 'Stock of current product selected does not match "Old Count", please re-check the product.'
                })
            } else
                return next();
        } catch (e) {
            res.send({
                status: 500,
                msg: 'Server error. Could not validate.'
            });
        }
    },

    validateNewMDgoods: async function(req, res, next) {
        let {
            productID,
            numDamaged,
            comment
        } = req.body;
        let product = await productModel.findOne({
            productID: productID
        });
        console.log(numDamaged);
        console.log(product.currentStock);
        try {
            if (productID == null) {
                res.send({
                    status: 401,
                    msg: 'no product with matching product ID found'
                });
            } else if (parseInt(numDamaged) > parseInt(product.currentStock)) {
                res.send({
                    status: 401,
                    msg: 'number of damaged cannot go beyond of current stock'
                });
            } else
                return next();
        } catch (e) {
            res.send({
                status: 500,
                msg: 'Server error. Could not validate.'
            });
        }
    },

    validateNewPurchase: async function(req, res, next) {
        /**get variables */
        let {
            deliveryID,
            datePaid,
            amountPaid,
            totalCost
        } = req.body;
        var today = new Date();
        var purchaseDate = new Date(datePaid);
        console.log(today);
        console.log(purchaseDate);
        console.log(today < purchaseDate);
        console.log(parseInt(amountPaid));
        console.log(parseInt(totalCost));
        console.log(parseInt(amountPaid) > parseInt(totalCost));
        try {
            if (today < purchaseDate) {
                /**validate date */
                res.send({
                    status: 401,
                    msg: 'date cannot be after today'
                });
            } else if (parseInt(amountPaid) > parseInt(totalCost)) {
                /**validate amountPaid */
                res.send({
                    status: 401,
                    msg: 'Amount paid is higher than total cost'
                });
            } else if (parseInt(amountPaid) < 0 || parseInt(totalCost) < 0) {
                /**validate amountPaid */
                res.send({
                    status: 401,
                    msg: 'Amount paid or total cost must not be lower than 0'
                });
            } else {
                return next();
            }

        } catch (e) {
            res.send({
                status: 500,
                msg: 'Server error. Could not validate.'
            });
        }

    },

    validateMDGoods_Approval: async function(req, res, next) {
        let {
            dmgrecordID,
            approved,
            numDamaged,
            productID
        } = req.body;
        /**if(approved)
            {check everything
                …
                next()
            }else
            next
        */
        if (approved) {
            let product = await productModel.findOne({
                productID: productID
            });
            console.log(numDamaged);
            console.log(product.currentStock);
            try {
                if (productID == null) {
                    res.send({
                        status: 401,
                        msg: 'no product with matching product ID found'
                    });
                } else if (parseInt(numDamaged) > parseInt(product.currentStock)) {
                    res.send({
                        status: 401,
                        msg: 'number of damaged cannot go beyond of current stock'
                    });
                } else
                    return next();
            } catch (e) {
                res.send({
                    status: 500,
                    msg: 'Server error. Could not validate.'
                });
            }
        } else {
            return next();
        }
    }

};

module.exports = indexMiddleware;