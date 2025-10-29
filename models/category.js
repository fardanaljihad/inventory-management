'use strict';
export default (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
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
            tableName: 'categories',
            timestamps: true,        
            createdAt: 'created_at',
            updatedAt: 'modified_at', 
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    );

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: 'categoryId',
            as: 'products'
        });
    };

    return Category;
};
