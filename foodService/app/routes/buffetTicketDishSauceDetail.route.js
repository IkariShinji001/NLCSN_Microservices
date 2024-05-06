const express = require("express");
const router = express.Router();
const buffetTicketDishSauceDetailController = require("../controllers/buffetTicketDishSauceDetail.controller");

router.route("/")
  .get(buffetTicketDishSauceDetailController.getAllTicketDishSauce)


router.route("/:id")
  .get(buffetTicketDishSauceDetailController.getAllTicketDishSauceById)
  .post(buffetTicketDishSauceDetailController.addDishSauceToTiket)
  .patch(buffetTicketDishSauceDetailController.removeDishFromTicket)

module.exports = router;
