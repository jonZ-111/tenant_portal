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
    leaseId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2),
    paymentDate: DataTypes.DATE,
    method: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'late', 'failed'),
      defaultValue: 'pending'
    },
    reference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};