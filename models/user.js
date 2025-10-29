'use strict';
export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            token: DataTypes.STRING,
            created_by: DataTypes.STRING,
            modified_by: DataTypes.STRING,
            deleted_by: DataTypes.STRING,
            created_at: DataTypes.DATE,
            modified_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE
        },
        {
            tableName: 'users',
            timestamps: true,        
            createdAt: 'created_at',
            updatedAt: 'modified_at', 
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    );

    return User;
};
