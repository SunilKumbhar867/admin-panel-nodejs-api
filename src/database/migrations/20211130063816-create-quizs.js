'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quizs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      question: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      opt1: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      opt2: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      opt3: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      opt4: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ans: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },        
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('quizs');
  }
};
