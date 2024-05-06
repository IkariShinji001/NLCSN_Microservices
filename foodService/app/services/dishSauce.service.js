const Dish = require("../models/dish.model");
const Sauce = require("../models/sauce.model");
const getRecords = require("../util/getRecords");
const { Op } = require("sequelize");

class DishSauceService {
  async addSauceToDish(sauceIds, dishId) {
    console.log(sauceIds, dishId);
    const dish = await Dish.findByPk(dishId);
    for (let i = 0; i < sauceIds.length; i++) {
      const sauce = await Sauce.findByPk(sauceIds[i]);
      await dish.addSauce(sauce);
    }
  }

  async removeSauceFromDish(dishId, sauceId) {
    const dish = await Dish.findByPk(dishId);
    const sauce = await Sauce.findByPk(sauceId);
    await dish.removeSauce(sauce);
  }

  async getDishSauceById(dishId) {
    const dishWithSauce = await Dish.findOne({
      where: { dish_id: dishId, is_deleted: false },
      include: Sauce,
    });
    return dishWithSauce;
  }

  async findAllDishWithSauce() {
    const dishWithSauce = await Dish.findAll({
      where: { is_deleted: false },
      include: Sauce,
    });
    return getRecords(dishWithSauce);
  }

  async findAllDishWithSauceByName(dishName) {
    const dishWithSauce = await Dish.findAll({
      where: {
        is_deleted: false,
        dish_name: {
          [Op.like]: `%${dishName}%`,
        },
      },
      include: Sauce,
    });
    return getRecords(dishWithSauce);
  }
}

module.exports = new DishSauceService();
