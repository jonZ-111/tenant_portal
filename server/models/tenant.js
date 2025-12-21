'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    static associate(models) {
      // Tenant → User (LOGIN OWNER)
      Tenant.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });

      // Tenant → Leases
      Tenant.hasMany(models.Lease, {
        foreignKey: 'tenantId',
        as: 'leases',
        onDelete: 'CASCADE',
      });

      // Tenant → Maintenance Tickets
      Tenant.hasMany(models.MaintenanceTicket, {
        foreignKey: 'tenantId',
        as: 'tickets',
        onDelete: 'CASCADE',
      });
    }
  }

  Tenant.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      unitNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending confirmation'),
        defaultValue: 'pending confirmation',
      },
    },
    {
      sequelize,
      modelName: 'Tenant',
      tableName: 'Tenants',
    }
  );

  return Tenant;
};
