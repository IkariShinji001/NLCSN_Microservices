const userService = require("../services/user.service");
const UserService = require("../services/user.service");

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAllUser();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = req.body;
      const newUser = await UserService.createUser(user);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error?.parent?.code === "23505") {
        return res.status(409).json("Dulicated user");
      }
      next(error);
    }
  }

  async update(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      await UserService.updateUser(id, payload);
      return res.status(200).json({ message: "oke" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      await UserService.delete(id);
      return res.status(200).json({ message: "oke" });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = req.body;
      const data = await UserService.login(user);

      if (!data) {
        return res
          .status(400)
          .json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
      }

      res.cookie("user_token", data.token, { httpOnly: true });

      return res
        .status(200)
        .json({ message: "Đăng nhập thành công", userData: data.userData });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("user_token");
      return res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
      console.log(error);
    }
  }

  async forgetPassword(req, res, next) {
    const userEmail = req.body.email;
    try {
      const result = await userService.forgetPassword(userEmail);

      if (!result) {
        return res.status(400).json({ message: "Lỗi xảy ra" });
      }
      return res.status(200).json({ message: "Vui lòng check mail" });
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(req, res, next) {
    const { user_id, password } = req.body;
    try {
      const role = await userService.resetPassword(user_id, password);
      return res
        .status(200)
        .json({ message: "Đổi mật khẩu thành công!", role });
    } catch (error) {
      next(error);
    }
  }

  async verifyManager(req, res, next) {
    const token = req.cookies["user_token"];
    console.log(token);
    try {
      if (!token) {
        return res.status(401).json({ message: "Không tồn tại token" });
      }
      await userService.verifyManager(token);
      return res.status(200).json({ message: "Token hợp lệ" });
    } catch (error) {
      next(error);
    }
  }

  async verifyAccessToken(req, res, next) {
    const token = req.cookies["user_token"];
    console.log(token);
    try {
      if (!token) {
        return res.status(401).json({ message: "Không tồn tại token" });
      }
      await userService.verifyAccessToken(token);
      return res.status(200).json({ message: "Token hợp lệ" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
