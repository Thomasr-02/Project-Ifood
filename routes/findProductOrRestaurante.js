var express = require('express');
var router = express.Router();
var controllerFindProdOrRest = require('../controllers/controllerFindProdOrRest')
/* GET dishs listing. */
var cors = require('cors')


router.get('/findProductOrRestaurante/:name', cors(),controllerFindProdOrRest.findProductOrRestaurante);


module.exports = router;
