var express = require('express');
var router = express.Router();
var controllerBuy = require('../controllers/controllerBuy')
/* GET buys listing. */

router.get('/buys', controllerBuy.findBuys);
router.get('/buys/:id', controllerBuy.findOneBuy);
router.post('/buys', controllerBuy.addBuy);
router.delete('/buys/:id', controllerBuy.delBuy);
router.put('/buys/:id', controllerBuy.updBuy);

module.exports = router;
 