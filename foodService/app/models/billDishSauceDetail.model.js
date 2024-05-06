const { DataTypes } = require("sequelize");
const db = require("../util/database");
const Dish = require("../models/dish.model");
const Sauce = require("../models/sauce.model");

const billDishSauceDetail = db.sequelize.define("bill_dish_sauce_detail", {
  bill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
});

billDishSauceDetail.belongsTo(Dish, { foreignKey: "dish_id" });
billDishSauceDetail.belongsTo(Sauce, { foreignKey: "sauce_id" });

module.exports = billDishSauceDetail;
