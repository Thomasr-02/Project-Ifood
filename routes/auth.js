const express 			= require('express');
const router 			= express.Router();
const controllerAuth	= require('../controllers/controllerAuth');
var cors = require('cors')
const { check , validationResult } = require('express-validator');
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.post('/login', cors(corsOptions),[
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
], controllerAuth.token);

module.exports = router;