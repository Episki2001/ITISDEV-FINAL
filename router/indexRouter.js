const express = require('express');
const router = express();
const controller = require('../controller/index');


router.get('/', controller.getLogin);
router.get('/discrepancy', controller.getDiscrepancy);
router.get('/a', controller.getAdmin);
router.get('/m', controller.getManager);
router.get('/u', controller.getUser);

module.exports = router;