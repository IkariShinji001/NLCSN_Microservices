const express = require('express')
const router = express.Router();
const SauceController = require('../controllers/sauce.controller');
const uploadCloudinary = require("../middlewares/uploadImage");
const upload = require("../middlewares/multer");

router.route('/')
  .get(SauceController.getAllSauces)
  .post(upload.single("image"), uploadCloudinary ,SauceController.createSauce)

router.route('/not-in')
  .get(SauceController.getSauceNotInList)

router.route('/:id')
  .get(SauceController.getSauceById)
  .patch(SauceController.updateSauce)
  .delete(SauceController.deleteSauce)

router.route('/:id/image')
  .patch(upload.single("image"), uploadCloudinary, SauceController.updateSauceImage)

module.exports = router;
