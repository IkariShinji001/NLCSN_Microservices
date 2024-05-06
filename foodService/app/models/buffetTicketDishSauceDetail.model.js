const { DataTypes } = require("sequelize");
const db = require("../util/database");
const Dish = require("./dish.model");

const buffetTicketDishSauceDetail = db.sequelize.define(
  "buffet_ticket_dish_sauce_detail",
  {
    buffet_ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
  },
  {
    // Define composite primary key
    primaryKey: ["buffet_ticket_id", "dish_id"],
  }
);

buffetTicketDishSauceDetail.belongsTo(Dish, {foreignKey: "dish_id"});

module.exports = buffetTicketDishSauceDetail;
