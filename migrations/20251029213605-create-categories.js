/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categories', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('categories');
    }
};
