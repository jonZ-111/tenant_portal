'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Lease, {
        foreignKey: 'leaseId',
        onDelete: 'CASCADE'
      });
    }
  }
  Payment.init({
      leaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM("cash", "card", "transfer", "other"),
        allowNull: false,
        defaultValue: "cash"
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'late', 'failed'),
        defaultValue: 'pending'
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      sequelize,
      modelName: 'Payment',
      tableName: 'Payments'
    }
  );

  return Payment;
};