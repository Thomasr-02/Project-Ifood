var express = require('express');
var router = express.Router();
var controllerUser = require('../controllers/controllerUser')
/* GET users listing. */
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.get('/users',cors(corsOptions), controllerUser.findUsers);
router.get('/users/:id', cors(corsOptions),controllerUser.findOneUser);
router.post('/users', cors(corsOptions),controllerUser.addUser);
router.delete('/users/:id', cors(corsOptions),controllerUser.delUser);
router.put('/users/:id', cors(corsOptions), controllerUser.updUser);


module.exports = router;
