const express = require('express');
const router = express();
const controller = require('../controller/index');


router.get('/', controller.getLogin);
router.get('/discrepancy', controller.getDiscrepancy);

module.exports = router;