const express = require('express');
const router = express();
const controller = require('../controller/index');


router.get('/', controller.getLogin);
router.get('/a/discrepancy', controller.getADiscrepancy);
router.get('/a/damgoods', controller.getADamagedGoods);
router.get('/a/newproducts', controller.getANewProducts);
router.get('/a/products', controller.getAProducts);
router.get('/a/purchases', controller.getAPurchases);
router.get('/m/discrepancy', controller.getMDiscrepancy);
router.get('/m/damgoods', controller.getMDamagedGoods);
router.get('/u', controller.getUser);

module.exports = router;