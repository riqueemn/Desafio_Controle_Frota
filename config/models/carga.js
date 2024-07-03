const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a configuração do Sequelize

const Carga = sequelize.define('Carga', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = Carga;
