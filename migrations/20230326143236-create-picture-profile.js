'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PictureProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProfileId : {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key:'id'
        },
        onDelete : 'cascade',
        onUpdate : 'cascade'
      },
      source500: {
        type: Sequelize.TEXT
      },
      source1000: {
        type: Sequelize.TEXT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PictureProfiles');
  }
};