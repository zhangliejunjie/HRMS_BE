'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {

    static associate(models) {
      // define association here
      Reports.belongsTo(models.Staffs, { foreignKey: "Interviewer_id" });
      Reports.belongsTo(models.Interviews, { foreignKey: "Interview_id" });

    }
  };
  Reports.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
    },
    Interview_id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.STRING(36),
      references: {
        model: "Interviews",
        key: "id",
      }
    },
    Interviewer_id: {
      allowNull: false,
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: "Staffs",
        key: "id",
      },
    },
    mark: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: true,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Reports',
    createdAt: false,
    updatedAt: false,
  });
  return Reports;
};