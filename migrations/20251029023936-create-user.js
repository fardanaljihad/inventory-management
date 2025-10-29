'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
            },
            created_at: {
                type: Sequelize.DATE
            },
            created_by: {
                type: Sequelize.STRING
            },
            modified_at: {
                type: Sequelize.DATE
            },
            modified_by: {
                type: Sequelize.STRING
            },
            deleted_at: {
                type: Sequelize.DATE
            },
            deleted_by: {
                type: Sequelize.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};