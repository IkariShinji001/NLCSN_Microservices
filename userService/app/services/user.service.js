const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const getRecords = require("../util/getRecords");
const rabbitMQ = require("./rabbitMQ");
const ApiError = require("../api-error");

class UserService {
  async getAllUser() {
    const data = await User.findAll();
    const users = getRecords(data);
    return users;
  }

  async createUser(user) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create(user);
    return newUser;
  }

  async login(user) {
    const data = await User.findOne({
      where: {
        email: user.email,
      },
    });
    let existedUser;

    if (data) {
      existedUser = data.get();
    }

    if (!existedUser) {
      return false;
    }
    const matchedPassword = await bcrypt.compare(
      user.password,
      existedUser.password
    );

    if (!matchedPassword) {
      return false;
    }
    const userData = {
      userId: existedUser.id,
      role: existedUser.role,
    };
    const token = jwt.sign(userData, config.jwt.secretKey, { expiresIn: "3h" });

    return { token, userData };
  }

  async forgetPassword(userEmail) {
    const data = await User.findOne({ where: { email: userEmail } });

    if (!data.get()) {
      return false;
    }

    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);

    const message = {
      type: "forget_password",
      email: userEmail,
      id: data.id,
    };

    const exchange = "notification_exchange";
    const routingKey = "notification.forget_password";

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

    setTimeout(() => {
      rabbitMQ.close(connection);
    }, 1000);

    return true;
  }

  async updateUser(id, payload) {
    await User.update(payload, { where: { id } });
  }

  async deleteUser(id) {
    await User.destroy({ where: { id } });
  }

  async resetPassword(userId, password) {
    console.log(userId, password);
    let existedUser = await User.findOne({ where: { id: userId } });
    if (!existedUser) {
      throw new ApiError(400, "Không tồn tại user");
    }

    existedUser.password = await bcrypt.hash(password, 10);

    await existedUser.save();

    return { role: existedUser.role };
  }

  async verifyAccessToken(token) {
    const verify = jwt.verify(token, config.jwt.secretKey);

    if (!verify) {
      throw new ApiError(401, "Token không hợp lệ");
    }
  }

  async verifyManager(token) {
    const verify = jwt.verify(token, config.jwt.secretKey);

    if (!verify) {
      throw new ApiError(401, "Token không hợp lệ");
    }

    if (verify.role !== "manager") {
      throw new ApiError(403, "Không có quyền truy cập");
    }
  }
}

module.exports = new UserService();
