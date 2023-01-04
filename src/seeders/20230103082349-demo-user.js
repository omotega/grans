// 'use strict';
const argon = require('argon2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = process.env.PASSWORD
    const password2 = process.env.SEED_PASSWORD;
    const hash = await argon.hash(password)
    const hash1 = await argon.hash(password2);
    await queryInterface.bulkInsert('Users', [{
      id: 3,
      name: 'emmanuel etim',
      email: 'emmaetim@gmail.com',
      password: hash,
      active: true,
      verified: true,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'emmanuel oroe',
      email: 'emmaetims@gmail.com',
      password: hash1,
      active: true,
      verified: true,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
