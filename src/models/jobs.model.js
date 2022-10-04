"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    static associate(models) {
      // define association here
      Jobs.hasMany(models.CandidateDetails, { foreignKey: "Job_id" });
      Jobs.belongsTo(models.Categories, { foreignKey: "Category_id" });
      Jobs.belongsTo(models.Campaigns, { foreignKey: "Campaign_id" });
    }
  }
  Jobs.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      salary: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      quantity: {
        defaultValue: 0,
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      Category_id: {
        allowNull: false,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      Campaign_id: {
        allowNull: false,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: "Campaigns",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Jobs",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Jobs;
};
