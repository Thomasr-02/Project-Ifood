var express = require('express');
var router = express.Router();
var controllerRestaurantes = require('../controllers/controllerRestaurantes')
/* GET restaurantes listing. */
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.get('/restaurantes',cors(corsOptions), controllerRestaurantes.findRestaurante);
router.get('/restaurantes/:id',cors(corsOptions), controllerRestaurantes.findOneRestaurante);
router.post('/restaurantes',cors(corsOptions), controllerRestaurantes.addRestaurante);
router.delete('/restaurantes/:id',cors(corsOptions), controllerRestaurantes.delRestaurante);
router.put('/restaurantes/:id',cors(corsOptions), controllerRestaurantes.updRestaurante);

module.exports = router;
 