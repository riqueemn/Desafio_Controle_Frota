import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Importa a configuração do Sequelize

const Carga = sequelize.define('Carga', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export default Carga;
