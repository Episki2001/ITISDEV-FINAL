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
        let { productID, quantity, dateSold } = req.body;
        let product = await productModel.findOne({ productID: productID });
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
                res.send({ status: 401, msg: 'no product with matching productID found' });
            } else if (parseInt(quantity) % 1 != 0 || parseInt(quantity) > parseInt(product.currentStock)) {
                /**check if quantity is less than or equal to stock */
                res.send({ status: 401, msg: 'quantity cannot be more than the current stock of the product or not a whole number' });
            } else if (today < saleDate) {
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