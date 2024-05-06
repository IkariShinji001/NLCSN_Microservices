const { DataTypes } = require("sequelize");
const db = require("../util/database");

const DishSauce = db.sequelize.define("dishSauce", {});

module.exports = DishSauce;
