const Dish = require("../models/dish.model");
const BuffetTicketDetail = require("../models/buffetTicketDishSauceDetail.model");
const cloudinaryService = require("./cloudinary.service");
const { Op } = require("sequelize");
const getRecords = require("../util/getRecords");

class DishService {
  async getAllDish() {
    const Dishes = await Dish.findAll({ where: { is_deleted: false } });
    return getRecords(Dishes);
  }

  async getDishById(id) {
    const dish = await Dish.findByPk(id);
    return dish;
  }

  async getDishByName(name) {
    const Dishes = await Dish.findAll({
      where: { dish_name: { [Op.like]: `%${name}%` }, is_deleted: false },
    });
    return getRecords(Dishes);
  }

  async createDish(dish) {
    const newDish = await Dish.create(dish);
    return newDish;
  }

  async updateDish(id, payload) {
    if (payload.dish_img) {
      const dish = await Dish.findByPk(id);
      const publicId = cloudinaryService.getImageIdFromSecureUrl(dish.dish_img);
      await cloudinaryService.deleteCloudinaryImage(publicId);
    }
    await Dish.update(payload, { where: { dish_id: id } });
    const updatedDish = await Dish.findByPk(id);
    return updatedDish;
  }

  async deleteDish(id) {
    await Dish.update({ is_deleted: true }, { where: { dish_id: id } });
    await BuffetTicketDetail.destroy({ where: { dish_id: id } });
  }

  async getDishNotInList(query) {
    const allDish = await Dish.findAll({
      where: {
        dish_id: {
          [Op.notIn]: query.dishIds,
        },
        is_deleted: false,
      },
    });

    return getRecords(allDish);
  }
}

module.exports = new DishService();
