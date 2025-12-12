'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tenant.associate =(models) => {
          Tenant.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
          onDelete: 'CASCADE'
        });
      };
      //One tenant can have many leases.
      Tenant.hasMany(models.Lease, {
        foreignKey: 'tenantId',
        as: 'leases',
        onDelete: 'CASCADE'
      });
      //One tenant can have many maintenance tickets
      Tenant.hasMany(models.MaintenanceTicket, {
        foreignKey: "tenantId",
        as: "tickets",
        onDelete: "CASCADE"
      });
    }
  }
  
  Tenant.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {isEmail: true}
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
     unitNumber:{
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Tenant',
    tableName: 'Tenants'
  });

  return Tenant;
};