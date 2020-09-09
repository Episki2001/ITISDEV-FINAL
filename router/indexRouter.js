const express = require('express');
const router = express();
const controller = require('../controller/index');


router.get('/', controller.getLogin);
router.get('/a/discrepancy/*', controller.getAdiscrepancy);
router.get('/a/product/*', controller.getAeditProduct);
router.get('/a/user/*', controller.getAeditProfile);
router.get('/a/editSupplier', controller.getAeditSupplier);
router.get('/a/MDgoods', controller.getAMDgoods);
router.get('/a/newProducts', controller.getAnewProducts);
router.get('/a/newSupplier', controller.getAnewSupplier);
router.get('/a/newUser', controller.getAnewUser);
router.get('/a/products', controller.getAproducts);
router.get('/a/purchases', controller.getApurchases);
router.get('/a/suppliers/*', controller.getAsuppliers);
router.get('/a/users', controller.getAusers);

module.exports = router;