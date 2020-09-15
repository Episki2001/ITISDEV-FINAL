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

async function currentDate() {
    var today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}

const indexMiddleware = {
    validateNewSale: async function(req, res, next) {
        // NEW SALE: check productID, quantity, and dateSold
        let { productID, quantity, dateSold } = req.body;
        let product = await productModel.findOne({ productID: productID });
        /**
         * if   product == null
         * if   quantity > product.currentStock
         * if   dateSold > currentDate
         * then return next()
         * else res.send msg validation failed
         */
        try {
            if (product == null) {
                /**check if productID is in db */
                res.send({ status: 401, msg: 'no product with matching productID found' });
            } else if (quantity > product.currentStock) {
                /**check if quantity is less than or equal to stock */
                res.send({ status: 401, msg: 'quantity is more than current stock of product' });
            } else if (dateSold > currentDate()) {
                /**check if date is valid*/
                res.send({ status: 401, msg: 'date sold cannot be after today' });
            } else
                return next();
        } catch (e) {
            res.send({ status: 500, msg: 'Server error. Could not validate.' });
        }
    },

};

module.exports = indexMiddleware;