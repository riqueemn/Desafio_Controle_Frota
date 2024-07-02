const { Model, DataTypes, Op } = require('sequelize');
const sequelize = require('../database'); 

class Delivery extends Model {
  static async countDeliveriesThisMonth(truckId) {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    return await Delivery.count({
      where: {
        truckId,
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
  }
}

Delivery.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  truckId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargoType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendente',
  },
  hasInsurance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Delivery',
});

module.exports = Delivery;
