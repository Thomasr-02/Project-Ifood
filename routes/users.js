const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/controllerUser');

const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('', controllerUser.get);
/* router.get('/:id', controllerUser.getById);
router.post('', [
  	check('first_name')	.isLength({ min: 3 }),
  	check('last_name')	.isLength({ min: 3 }),
  	check('email')		.isEmail(),
  	check('phone')		.isNumeric(),
  	check('password')	.isLength({ min: 3 })
], controllerUser.put);

router.delete('/:id', controllerUser.delete); */

module.exports = router;