const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a configuração do Sequelize

const Address = sequelize.define('Address', {
  local: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
});

module.exports = Address;
