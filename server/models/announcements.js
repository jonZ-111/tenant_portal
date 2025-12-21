"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    static associate(models) {
      Announcement.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "admin",
      });
    }
  }

  Announcement.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Announcement",
      tableName: "Announcements",
    }
  );

  return Announcement;
};
