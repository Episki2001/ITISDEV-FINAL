const express = require('express');
const router = express();
const controller = require('../controller/index');

router.get('/', controller.getHome);

module.exports = router;