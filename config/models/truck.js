const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a configuração do Sequelize

const Truck = sequelize.define('Truck', {
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Truck;
