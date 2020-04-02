var express = require('express');
var router = express.Router();
var controllerFindProdOrRest = require('../controllers/controllerFindProdOrRest')
/* GET dishs listing. */
var cors = require('cors')

router.get('/findRestaurante/:rest', cors(),controllerFindProdOrRest.findRestauranteByName);
router.get('/findProduct/:dish', cors(),controllerFindProdOrRest.findDishByName);
router.get('/findProductOrRestaurante/', cors(),controllerFindProdOrRest.ListOrProductRestaurante);

module.exports = router;
