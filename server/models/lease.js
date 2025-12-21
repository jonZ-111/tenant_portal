'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lease.belongsTo(models.Tenant, {
        foreignKey: 'tenantId',
        as: 'tenant',
        onDelete: 'CASCADE'
      });

      Lease.hasMany(models.Payment, {
        foreignKey: 'leaseId',
        as:'payments',
        onDelete: 'CASCADE',
      })
    }
  }

  Lease.init({
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    rentDueDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "ended"),
      allowNull: false,
      defaultValue: "pending"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    } 
  }, {
    sequelize,
    modelName: 'Lease',
    tableName: 'Leases'
  });
  
  return Lease;
};