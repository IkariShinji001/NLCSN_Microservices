const { DataTypes } = require("sequelize");
const db = require("../util/database");

const Dish = db.sequelize.define("dish", {
  dish_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dish_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dish_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});



module.exports = Dish;