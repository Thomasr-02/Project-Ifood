var express = require('express');
var router = express.Router();
var controllerRestaurantes = require('../controllers/controllerRestaurantes')
/* GET restaurantes listing. */
var cors = require('cors')

router.get('/restaurantes',cors(), controllerRestaurantes.findRestaurante);
router.get('/restaurantes/:id',cors(), controllerRestaurantes.findOneRestaurante);
router.post('/restaurantes',cors(), controllerRestaurantes.addRestaurante);
router.delete('/restaurantes/:id',cors(), controllerRestaurantes.delRestaurante);
router.put('/restaurantes/:id',cors(), controllerRestaurantes.updRestaurante);

module.exports = router;
 