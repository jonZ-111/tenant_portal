"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MaintenanceTicket extends Model {
    static associate(models) {
      MaintenanceTicket.belongsTo(models.Tenant, {
        foreignKey: "tenantId",
        as: "tenant",
        onDelete: "CASCADE",
      });
    }
  }

  MaintenanceTicket.init(
    {
      tenantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("plumbing", "electrical", "appliance", "general"),
        allowNull: false,
        defaultValue: "general",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("open", "in-progress", "closed"),
        allowNull: false,
        defaultValue: "open",
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
        defaultValue: "medium",
      },
    },
    {
      sequelize,
      modelName: "MaintenanceTicket",
      tableName: "MaintenanceTickets",
    }
  );

  return MaintenanceTicket;
};
