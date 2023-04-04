'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      txnType: {
        type: Sequelize.STRING,
        values:['debit','credit'],
        allowNull:false,
      },
      purpose: {
        type: Sequelize.STRING,
        values: ["deposit", "transfer", "withdrawal", "reversal"],
        allowNull:false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      reference: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        unique:true,
      },
      balanceBefore: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      balanceAfter: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      metadata: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};