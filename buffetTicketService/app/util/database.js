const { Sequelize } = require("sequelize");
require("dotenv").config();

class PgDB {
  constructor() {
    // Kiểm tra nếu đã có một thể hiện của PgDB, trả về thể hiện đó
    if (!PgDB.Instance) {
      // Gọi hàm init để khởi tạo đối tượng Sequelize và kết nối đến cơ sở dữ liệu
      this.init();
      // Lưu thể hiện của PgDB để sử dụng chung
      PgDB.Instance = this;
    }
    // Trả về thể hiện của PgDB
    return PgDB.Instance;
  }

  // Hàm khởi tạo Sequelize và kết nối đến cơ sở dữ liệu
  async init() {
    try {
      // Tạo đối tượng Sequelize với các thông số kết nối từ biến môi trường
      this.sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
      });

      // Kiểm tra kết nối đến cơ sở dữ liệu
      await this.sequelize.authenticate();
      console.log("Kết nối với cơ sở dữ liệu thành công.");
    } catch (error) {
      // Xử lý lỗi nếu không thể kết nối đến cơ sở dữ liệu
      console.error("Không thể kết nối đến cơ sở dữ liệu:", error);
    }
  }

  // Hàm đồng bộ hóa cơ sở dữ liệu với các mô hình (models)
  async sync() {
    await this.sequelize.sync();
  }

  // Hàm đóng kết nối đến cơ sở dữ liệu
  async close() {
    await this.sequelize.close();
  }
}

// Xuất đối tượng PgDB để sử dụng trong các module khác
module.exports = new PgDB();
