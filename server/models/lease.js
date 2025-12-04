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
        onDelete: 'CASCADE'
      });
    }
  }
  Lease.init({
    tenantId: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    rentAmount: DataTypes.DECIMAL,
    rentDueDate: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lease',
  });
  
  return Lease;
};