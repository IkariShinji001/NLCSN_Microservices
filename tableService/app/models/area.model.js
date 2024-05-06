const { DataTypes } = require("sequelize");
const db = require("../util/database");
const Table = require("./table.model");

const Area = db.sequelize.define("area", {
  area_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  area_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Area.hasMany(Table, {
  foreignKey: {
    name: 'area_id',
    allowNull: false // Đảm bảo rằng trường foreign key không được null
  }
});

module.exports = Area;
