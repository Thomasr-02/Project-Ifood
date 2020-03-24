var express = require('express');
var router = express.Router();
var childRouter = express.Router({mergeParams: true});
var controllerUser = require('../controllers/controllerUser')
/* GET users listing. */
var cors = require('cors')

// you can nest routers by attaching them as middleware:
router.use('/:id/buys', childRouter);

router.get('/users',cors(), controllerUser.findUsers);
router.get('/users/:id', cors(),controllerUser.findOneUser);
router.post('/users', cors(),controllerUser.addUser);
router.delete('/users/:id', cors(),controllerUser.delUser);
router.put('/users/:id', cors(), controllerUser.updUser);
//childRouter.get('/', controllerUser.findUserBuys);
router.get('/users/:id/buys',controllerUser.findUserBuys)

module.exports = router;
