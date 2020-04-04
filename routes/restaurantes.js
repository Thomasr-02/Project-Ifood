var express = require('express');
var router = express.Router();
var controllerRestaurantes = require('../controllers/controllerRestaurantes')
/* GET restaurantes listing. */

router.get('/restaurantes', controllerRestaurantes.findRestaurante);
router.get('/restaurantes/:id', controllerRestaurantes.findOneRestaurante);
router.post('/restaurantes', controllerRestaurantes.addRestaurante);
router.delete('/restaurantes/:id', controllerRestaurantes.delRestaurante);
router.put('/restaurantes/:id', controllerRestaurantes.updRestaurante);
router.get('/restaurantes/:id/dishes',controllerRestaurantes.findRestauranteDishes)

//relatorios
router.get('/restaurantes/:id/reportone',controllerRestaurantes.findReportOne)
router.get('/restaurantes/:id/reporttwo/:days',controllerRestaurantes.findReportTwo)
router.get('/restaurantes/:id/reportthree',controllerRestaurantes.findReportThree)

//categorizacao e criterios dinamicos
router.get('/restaurantes/mostpopular',controllerRestaurantes.findMostPopular)
router.get('/restaurantes/bestcheap/:id',controllerRestaurantes.findCheapRestaurants)

module.exports = router;
 