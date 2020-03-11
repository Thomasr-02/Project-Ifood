var express = require('express');
var router = express.Router();
var controllerUser = require('../controllers/controllerUser')
/* GET users listing. */

router.get('/users', controllerUser.findUsers);
router.get('/users/:id', controllerUser.findOneUser);
router.post('/users', controllerUser.addUser);
router.delete('/users/:id', controllerUser.delUser);
router.put('/users/:id', controllerUser.updUser);



module.exports = router;
 