'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Deliveries', [
      { truckId: 1, driverId: 'Driver A', cargoType: 'Eletrônicos', value: 5000.00, destination: 'City A', status: 'Pendente', createdAt: new Date(), updatedAt: new Date() },
      { truckId: 2, driverId: 'Driver B', cargoType: 'Combustível', value: 7000.00, destination: 'City B', status: 'Concluída', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Deliveries', null, {});
  }
};
