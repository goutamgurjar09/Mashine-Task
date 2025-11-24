const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RateLimit = sequelize.define("RateLimit", {
  userId: {
    type: DataTypes.STRING,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = RateLimit;
