'use strict';
export default (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            categoryId: {
                type: DataTypes.UUID
            },
            created_at: {
                type: DataTypes.DATE
            },
            created_by: {
                type: DataTypes.STRING
            },
            modified_at: {
                type: DataTypes.DATE
            },
            modified_by: {
                type: DataTypes.STRING
            },
            deleted_at: {
                type: DataTypes.DATE
            },
            deleted_by: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'products',
            timestamps: true,        
            createdAt: 'created_at',
            updatedAt: 'modified_at', 
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    );

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
    }

    return Product;
}
