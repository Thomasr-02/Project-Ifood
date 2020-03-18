var express = require('express');
var router = express.Router();
var controllerDish = require('../controllers/controllerDish')
/* GET users listing. */
var cors = require('cors')

router.get('/dishes',cors(), controllerDish.findDishes);
router.get('/dishes/:id', cors(),controllerDish.findOneDish);
router.post('/dishes', cors(),controllerDish.addDish);
router.delete('/dishes/:id', cors(),controllerDish.delDish);
router.put('/dishes/:id', cors(), controllerDish.updDish);

module.exports = router;
