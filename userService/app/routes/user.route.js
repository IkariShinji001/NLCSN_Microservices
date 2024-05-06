const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('/')
  .get(userController.getAll)
  .post(userController.create)

router.route('/:id')
  .patch(userController.update)
  .delete(userController.delete)

router.route('/login')
  .post(userController.login)

router.route('/verify-access-token')
  .get(userController.verifyAccessToken)

router.route('/verify-manager')
  .post(userController.verifyManager)

router.route('/forget-password')
  .post(userController.forgetPassword)

router.route('/reset-password')
  .post(userController.resetPassword)

router.route('/logout')
  .post(userController.logout);
module.exports = router;
