const express = require('express')
const router = express.Router();
const billController = require('../controllers/bill.controller');

router.route('/')
  .get(billController.getAll)

router.route('/tables/:id')
  .get(billController.getBillFoodByTableId)

router.route('/revenue')
  .get(billController.getBillRevenueStartToEnd)

router.route('/:id/payment')
  .patch(billController.processBillPayment)

router.route("/revenue/today")
  .get(billController.getBillRevenueToday)
  
router.route('/tables/:id/inuse')
  .get(billController.getBilInuseByTableId)

module.exports = router;
