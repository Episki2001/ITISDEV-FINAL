const express = require('express');
const router = express();
const controller = require('../controller/index');

router.get('/', controller.getHome);
router.get('/registration', controller.getRegister);
router.get('/login', controller.getLogin);
router.get('/account', controller.getAccount);
