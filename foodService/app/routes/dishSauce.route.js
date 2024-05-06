const express = require('express')
const router = express.Router();
const dishSauceController = require('../controllers/dishSauce.controller');

router.route('/')
  .get(dishSauceController.getAllDishWithSauce)
  .post(dishSauceController.addSauceToDish)
  .patch(dishSauceController.removeSauceFromDish);

router.route('/:id')
  .get(dishSauceController.getDishSauceById)

module.exports = router;
