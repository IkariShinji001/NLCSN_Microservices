const express = require("express");
const router = express.Router();
const BillDishSauceDetailController = require("../controllers/billDishSauceDetail.controller");

router.route("/")
  .get(BillDishSauceDetailController.getAllBillDishSauceDetail)
  .post(BillDishSauceDetailController.createBillDishSauce)

router.route("/statistic")
  .get(BillDishSauceDetailController.getBillFoodDetails)

  
module.exports = router;
