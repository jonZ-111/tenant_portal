'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Tenant, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempPassword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mustChangePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "tenant"),
        defaultValue: "tenant",
      },
    },
    {
      sequelize,
      modelName: "User",

      // 🔑 IMPORTANT PART
      defaultScope: {
        attributes: { exclude: ["password", "tempPassword"] },
      },
      scopes: {
        withSecrets: {
          attributes: { include: ["password", "tempPassword"] },
        },
      },
    }
  );

  return User;
};
