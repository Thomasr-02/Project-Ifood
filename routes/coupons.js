var express = require('express');
var router = express.Router();
var controllerCoupon = require('../controllers/controllerCoupon')
/* GET coupons listing. */

router.get('/coupons', controllerCoupon.findCoupons);
router.get('/coupons/:id', controllerCoupon.findOneCoupon);
router.post('/coupons', controllerCoupon.addCoupon);
router.delete('/coupons/:id', controllerCoupon.delCoupon);
router.put('/coupons/:id', controllerCoupon.updCoupon);

module.exports = router;