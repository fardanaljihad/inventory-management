/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            categoryId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'categories',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};
