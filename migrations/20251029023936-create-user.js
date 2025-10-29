'use strict';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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
                type: Sequelize.DATE,
                defaultValue: null
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

        const hashedPassword = await bcrypt.hash('password', 10);
        await queryInterface.bulkInsert('users', [{
            id: uuidv4(),
            name: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            created_at: new Date(),
            created_by: 'system'
        }]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};