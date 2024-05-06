const { DataTypes } = require("sequelize");
const db = require("../util/database");

const Bill = db.sequelize.define("table", {
  bill_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bill_status: {
    type: DataTypes.ENUM("inuse", "paid"),
    defaultValue: "inuse",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_at: {
    type: DataTypes.DATE,
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buffet_ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buffet_ticket_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bill;
