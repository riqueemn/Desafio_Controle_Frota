'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Drivers', [
      { name: 'Driver A', TruckId: 'Model A', deliveriesCompleted: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Driver B', TruckId: 'Model B', deliveriesCompleted: 15, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drivers', null, {});
  }
};
