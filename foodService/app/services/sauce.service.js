const Sauce = require("../models/sauce.model");
const cloudinaryService = require("./cloudinary.service");
const { Op } = require("sequelize");
const getRecords = require("../util/getRecords");
class SauceService {
  async getAllSauces() {
    const Sauces = await Sauce.findAll({ where: { is_deleted: false } });
    return getRecords(Sauces);
  }

  async getSaucesNotInList(query) {
    const allSauces = await Sauce.findAll({
      where: {
        sauce_id: {
          [Op.notIn]: query.sauceIds,
        },
        is_deleted: false,
      },
    });

    return getRecords(allSauces);
  }

  async createSauce(sauce) {
    const newSauce = await Sauce.create(sauce);
    return newSauce;
  }

  async getSauceById(id) {
    const sauce = await Sauce.findByPk(id, { where: { is_deleted: false } });
    return sauce;
  }

  async getSauceByName(name) {
    const sauces = await Sauce.findAll({
      where: { sauce_name: { [Op.like]: `%${name}%` }, is_deleted: false },
    });
    return getRecords(sauces);
  }

  async updateSauce(id, payload) {
    if (payload.sauce_img) {
      const sauce = await Sauce.findByPk(id);
      const publicId = cloudinaryService.getImageIdFromSecureUrl(
        sauce.sauce_img
      );
      await cloudinaryService.deleteCloudinaryImage(publicId);
    }
    await Sauce.update(payload, { where: { sauce_id: id } });
    const updatedSauce = await Sauce.findByPk(id);
    return updatedSauce;
  }

  async deleteSauce(id) {
    await Sauce.update({ is_deleted: true }, { where: { sauce_id: id } });
  }
}

module.exports = new SauceService();
