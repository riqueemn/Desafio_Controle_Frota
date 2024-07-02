const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Driver = sequelize.define('Drivers', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  TruckId: DataTypes.STRING,
  deliveriesCompleted: DataTypes.INTEGER,
});

module.exports = Driver;
