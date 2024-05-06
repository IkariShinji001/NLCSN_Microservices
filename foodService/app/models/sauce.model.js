const { DataTypes } = require("sequelize");
const db = require("../util/database");
const Dish = require("./dish.model");
const DishSauce = require("./dishSauce.model");

const Sauce = db.sequelize.define("sauce", {
  sauce_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  sauce_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sauce_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

Sauce.belongsToMany(Dish, { through: DishSauce });
Dish.belongsToMany(Sauce, { through: DishSauce });

module.exports = Sauce;
