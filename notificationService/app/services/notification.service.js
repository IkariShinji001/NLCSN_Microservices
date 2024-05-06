const Notification = require("../models/notification.model");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const getRecords = require("../util/getRecords");

class NotificationService {

  async getAll(){
    const notification = await Notification.findAll();
    return notification;
  }

  async create(notification){
    const newNotification = await Notification.create(notification);
    return newNotification;
  }

}

module.exports = new NotificationService();
