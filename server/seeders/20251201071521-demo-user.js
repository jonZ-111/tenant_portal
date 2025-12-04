'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const hashedPassword = await bcrypt.hash("adminUime1!", 10);

    await queryInterface.bulkInsert('Users', [{
       email: 'admin1@uime.com',
       password: hashedPassword,
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
