const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Delivery = sequelize.define('Delivery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  truckId: DataTypes.INTEGER,
  driverId: DataTypes.STRING,
  cargoType: DataTypes.STRING,
  value: DataTypes.FLOAT,
  destination: DataTypes.STRING,
  status: DataTypes.STRING,
});

Delivery.associate = function(models) {
  // associations can be defined here
};

module.exports = Delivery;
