const express 			= require('express');
const router 			= express.Router();
const controllerAuth	= require('../controllers/controllerAuth');
const { check } = require('express-validator');

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
], controllerAuth.token);

module.exports = router;