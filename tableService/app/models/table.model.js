const { DataTypes } = require('sequelize');
const db = require('../util/database');

const Table = db.sequelize.define('table', {
  table_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  table_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'occupied'),
    defaultValue: 'available'
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
})


module.exports = Table;