'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Leases', 'rentDueDate', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Leases', 'rentDueDate');
  },
};