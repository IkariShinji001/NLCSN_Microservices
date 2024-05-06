const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dish.controller");
const uploadCloudinary = require("../middlewares/uploadImage");
const upload = require("../middlewares/multer");

router.route("/")
  .get(dishController.getAllDishes)
  .post(upload.single("image"), uploadCloudinary, dishController.createDish);

  router.route("/not-in")
  .get(dishController.getDishNotInList)

router.route("/:id")
  .get(dishController.getDishById)
  .patch(dishController.updateDish)
  .delete(dishController.deleteDish);


router.route("/:id/image")
  .patch(upload.single("image"), uploadCloudinary, dishController.updateDishImage)

module.exports = router;
