var express = require('express');
var router = express.Router();
var controllerRestaurantes = require('../controllers/controllerRestaurantes')
/* GET restaurantes listing. */

router.get('/restaurantes', controllerRestaurantes.findRestaurante);
router.get('/restaurantes/:id', controllerRestaurantes.findOneRestaurante);
router.post('/restaurantes', controllerRestaurantes.addRestaurante);
router.delete('/restaurantes/:id', controllerRestaurantes.delRestaurante);
router.put('/restaurantes/:id', controllerRestaurantes.updRestaurante);

module.exports = router;
 