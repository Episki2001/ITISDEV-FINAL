const express = require('express');
const router = express();
const controller = require('../controller/index');
const indexMiddleware = require('../middlewares/indexMiddleware');

// GETS
router.get('/', controller.getLogin);
router.get('/a/discrepancy', controller.getAdiscrepancy);
// router.get('/a/product/editProduct', controller.getAeditProduct);
router.get('/a/user/editProfile/*', controller.getAeditProfile);
// router.get('/a/editSupplier', controller.getAeditSupplier);
router.get('/a/MDgoods', controller.getAMDgoods);
router.get('/a/newDelivery', controller.getAnewDelivery);
router.get('/a/newProducts', controller.getAnewProducts);
router.get('/a/newPurchase', controller.getAnewPurchase);
router.get('/a/newSale', controller.getAnewSale);
router.get('/a/newSupplier', controller.getAnewSupplier);
router.get('/a/newUser', controller.getAnewUser);
router.get('/a/deliveries', controller.getAdeliveries);
router.get('/a/products', controller.getAproducts);
router.get('/a/products/:productID', controller.getAoneEditProduct);
router.get('/a/purchases', controller.getApurchases);
router.get('/a/sales', controller.getAsales);
router.get('/a/suppliers', controller.getAsuppliers);
router.get('/a/suppliers/:supplierID', controller.getAoneSupplier);
router.get('/a/users', controller.getAusers);
router.get('/a/managers', controller.getAmanagers);
// ACTIONS
router.post('/newSale/:checkProdID', controller.getProductDetails);
// POSTS
router.post('/', controller.postLogin);
router.post('/newSale_submit', indexMiddleware.validateNewSale, controller.postNewSale);
router.post('/a/newUser', controller.postNewUser);
router.post('/newSupplier', controller.postNewSupplier);
router.post('/editSuppliers', controller.postEditSupplier)
router.post('/logout', controller.postLogout);
router.post('/newProduct', controller.postNewProduct);
router.post('/newDelivery', indexMiddleware.validateNewDelivery, controller.postNewDelivery);
router.post('/editProduct', controller.postEditProduct);


module.exports = router;