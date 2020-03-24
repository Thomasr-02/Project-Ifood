var express = require('express');
var router = express.Router();
var controllerUser = require('../controllers/controllerUser')
/* GET users listing. */
var cors = require('cors')

router.get('/users',cors(), controllerUser.findUsers);
router.get('/users/:id', cors(),controllerUser.findOneUser);
router.get('/users/:id/buys',controllerUser.findUserBuys);
router.post('/users', cors(),controllerUser.addUser);
router.post('/users/:id/buys',controllerUser.addBuyOnUser);
router.delete('/users/:id', cors(),controllerUser.delUser);
router.put('/users/:id', cors(), controllerUser.updUser);

module.exports = router;
