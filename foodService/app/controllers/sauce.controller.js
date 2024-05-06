const SauceService = require("../services/sauce.service");

class SauceController {
  async getAllSauces(req, res, next) {
    const query = req.query;
    try {
      if (query.sauce_name) {
        const sauces = await SauceService.getSauceByName(query.sauce_name);
        return res.status(200).json(sauces);
      }
      const sauces = await SauceService.getAllSauces();
      return res.status(200).json(sauces);
    } catch (error) {
      next(error);
    }
  }

  async getSauceNotInList(req, res, next) {
    const sauceIds = req.query;
    try {
      if (Object.keys(sauceIds).length === 0) {
        const sauces = await SauceService.getAllSauces();
        return res.status(200).json(sauces);
      }
      const sauces = await SauceService.getSaucesNotInList(sauceIds);
      return res.status(200).json(sauces);
    } catch (error) {
      next(error);
    }
  }

  async createSauce(req, res, next) {
    const sauce = req.body;
    sauce.sauce_img = req.cloudinary_secure_url;
    try {
      const newSauce = await SauceService.createSauce(sauce);
      return res.status(200).json(newSauce);
    } catch (error) {
      next(error);
    }
  }

  async getSauceById(req, res, next) {
    try {
      const sauce = await SauceService.getSauceById(req.params.id);
      return res.status(200).json(sauce);
    } catch (error) {
      next(error);
    }
  }

  async updateSauce(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      await SauceService.updateSauce(id, payload);
      return res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      next(error);
    }
  }

  async updateSauceImage(req, res, next) {
    const id = req.params.id;
    const image = req.cloudinary_secure_url;
    try {
      const updated = await SauceService.updateSauce(id, { sauce_img: image });
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteSauce(req, res, next) {
    const id = req.params.id;
    try {
      await SauceService.deleteSauce(id);
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SauceController();
