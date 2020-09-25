const express = require('express');
const router = express();
const controller = require('../controller/index');
const indexMiddleware = require('../middlewares/indexMiddleware');

// GETS
router.get('/', controller.getLogin);

//ADMINS
router.get('/a/discrepancy', controller.getAdiscrepancy);
// router.get('/a/product/editProduct', controller.getAeditProduct);
router.get('/a/user/editProfile/*', controller.getAeditProfile);
// router.get('/a/editSupplier', controller.getAeditSupplier);
router.get('/a/MDgoods', controller.getAMDgoods);
router.get('/a/MDGoods/:dmgrecordID', controller.getAoneMDGoods);
router.get('/a/forApprovalMDgoods', controller.getAForApprovalMDgoods);
router.get('/a/approveMDGoods/:dmgrecordID', controller.getAoneFAMDGoods);
router.get('/a/thresholds', controller.getAThreshold);
router.get('/a/newDelivery', controller.getAnewDelivery);
router.get('/a/newDiscrepancy', controller.getAnewDiscrepancy);
router.get('/a/newMDgoods', controller.getAnewMDgoods);
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
router.get('/a/newManager', controller.getAnewManager);
// ACTIONS
router.post('/newSale/:checkProdID', controller.getProductDetails);
router.post('/newDiscrepancy/:checkProdID', controller.getProductDetails);
router.post('/newPurchase/:deliveryID', controller.calculateTotalCost);
router.post('/newMDgoods/:checkProdID', controller.getProductDetails);
// POSTS
router.post('/', controller.postLogin);
router.post('/newSale_submit', indexMiddleware.validateNewSale, controller.postNewSale);
router.post('/a/newUser', controller.postNewUser);
router.post('/newSupplier', controller.postNewSupplier);
router.post('/editSuppliers', controller.postEditSupplier);
router.post('/newDiscrepancy', indexMiddleware.validateNewDiscrepancy, controller.postNewDiscrepancy);
router.post('/newMDgoods', indexMiddleware.validateNewMDgoods, controller.postNewMDgoods);
router.post('/logout', controller.postLogout);
router.post('/newProduct', controller.postNewProduct);
router.post('/newDelivery', indexMiddleware.validateNewDelivery, controller.postNewDelivery);
router.post('/editProduct', controller.postEditProduct);
router.post('/newPurchase', controller.postNewPurchase);
router.post('/newManager', controller.postNewManager);
router.post('/approvalMDGoods', controller.postApprovalMDGoods);
//MANAGERS
router.get('/m/products', controller.getMproducts);
router.get('/m/products/:productID', controller.getMoneEditProduct);
router.get('/m/newProducts', controller.getMnewProducts);
router.get('/m/suppliers', controller.getMsupplier);
router.get('/m/suppliers/:supplierID', controller.getMoneSupplier);
router.get('/m/newSupplier', controller.getMnewSupplier);
router.get('/m/purchases', controller.getMpurchases);
router.get('/m/newPurchase', controller.getMnewPurchase);
router.get('/m/deliveries', controller.getMdeliveries);
router.get('/m/newDelivery', controller.getMnewDelivery);
router.get('/m/sales', controller.getMsales);
router.get('/m/newSale', controller.getMnewSale);
router.get('/m/MDgoods', controller.getMMDgoods);
router.get('/m/MDGoods/:dmgrecordID', controller.getMoneMDGoods);
router.get('/m/newMDgoods', controller.getMnewMDgoods);
router.get('/m/discrepancy', controller.getMdiscrepancy);

//USERS
router.get('/u/products', controller.getUproducts);
router.get('/u/products/:productID', controller.getUoneViewProduct);
router.get('/u/suppliers', controller.getUsuppliers);
router.get('/u/newSale', controller.getUnewSale);
router.get('/U/newMDgoods', controller.getUnewMDgoods);
router.get('/u/newDiscrepancy', controller.getUnewDiscrepancy);
router.get('/u/newDelivery', controller.getUnewDelivery);


module.exports = router;