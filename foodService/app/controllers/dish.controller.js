const dishService = require("../services/dish.service");
const DishService = require("../services/dish.service");

class DishController {
  async getAllDishes(req, res, next) {
    const query = req.query;
    try {
      if (query.dish_name) {
        const dishes = await DishService.getDishByName(query.dish_name);
        return res.status(200).json(dishes);
      }
      const dishes = await DishService.getAllDish();
      return res.status(200).json(dishes);
    } catch (error) {
      next(error);
    }
  }

  async getDishById(req, res, next) {
    try {
      const dish = await DishService.getDishById(req.params.id);
      return res.status(200).json(dish);
    } catch (error) {
      next(error);
    }
  }

  async createDish(req, res, next) {
    const dish = req.body;
    dish.dish_img = req.cloudinary_secure_url;
    try {
      const newDish = await DishService.createDish(dish);
      return res.status(200).json(newDish);
    } catch (error) {
      next(error);
    }
  }

  async updateDish(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      await dishService.updateDish(id, payload);
      return res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      next(error);
    }
  }

  async updateDishImage(req, res, next) {
    const id = req.params.id;
    const image = req.cloudinary_secure_url;
    try {
      const updated = await dishService.updateDish(id, { dish_img: image });
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteDish(req, res, next) {
    const id = req.params.id;
    try {
      await dishService.deleteDish(id);
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      next(error);
    }
  }

  
  async getDishNotInList(req, res, next) {
    const dishIds = req.query;
    try {
      if (Object.keys(dishIds).length === 0) {
        const dishes = await DishService.getAllDish();
        return res.status(200).json(dishes);
      }
      const dishes = await DishService.getDishNotInList(dishIds);
      return res.status(200).json(dishes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DishController();
