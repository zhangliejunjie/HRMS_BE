"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  campaignStatusDefault,
  campaignStatus,
} = require("../constant/campaignStatus.enum");

module.exports = (sequelize, DataTypes) => {
  class Campaigns extends Model {
    static associate(models) {
      // define association here
      Campaigns.hasMany(models.Jobs, { foreignKey: "Campaign_id" });
    }
  }
  Campaigns.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(campaignStatus),
        defaultValue: campaignStatusDefault,
      },
    },
    {
      sequelize,
      modelName: "Campaigns",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Campaigns.beforeCreate((cam) => (cam.id = uuidv4()));
  return Campaigns;
};
