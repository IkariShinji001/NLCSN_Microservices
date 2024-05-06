const { DataTypes } = require('sequelize');
const db = require('../util/database');

const buffetTicket = db.sequelize.define('buffetTicket', {
  buffet_ticket_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  buffet_ticket_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buffet_ticket_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buffet_ticket_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  in_business: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})


module.exports = buffetTicket;