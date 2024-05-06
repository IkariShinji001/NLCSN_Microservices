const Dish = require("../models/dish.model");
const Sauce = require("../models/sauce.model");
const DishSauceService = require("../services/dishSauce.service");

class DishSauce {
  async addSauceToDish(req, res, next) {
    const payload = req.body;
    try {
      await DishSauceService.addSauceToDish(payload.sauceIds, payload.dishId);
      return res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }

  async removeSauceFromDish(req, res, next) {
    const payload = req.body;
    try {
      await DishSauceService.removeSauceFromDish(payload.dishId, payload.sauceId);
      return res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }

  async getDishSauceById(req, res, next) {
    const id = req.params.id;
    try {
      const DishSauce = await DishSauceService.getDishSauceById(id);
      return res.status(200).json(DishSauce);
    } catch (error) {
      next(error);
    }
  }

  async getAllDishWithSauce(req, res, next) {
    const query = req.query || null;
    console.log(query);
    try {
      if (query.dish_name) {
        const dishWithSauce = await DishSauceService.findAllDishWithSauceByName(
          query.dish_name
        );
        return res.status(200).json(dishWithSauce);
      }

      const dishWithSauce = await DishSauceService.findAllDishWithSauce();
      return res.status(200).json(dishWithSauce);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DishSauce();
