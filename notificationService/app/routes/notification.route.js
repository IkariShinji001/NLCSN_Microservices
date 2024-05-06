const express = require('express')
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

router.route('/')
  .get(notificationController.getAll)
  .post(notificationController.create);



module.exports = router;
