const notificationService = require("../services/notification.service");

class notificationController {
  async getAll(req, res, next) {
    try {
      const notification = await notificationService.getAll();
      return res.status(200).json(notification);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res, next) {
    try {
      const notification = await notificationService.create(req.body);
      return res.status(200).json(notification);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new notificationController();
