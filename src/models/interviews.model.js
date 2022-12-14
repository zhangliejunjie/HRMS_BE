"use strict";
const { Model } = require("sequelize");
const {
  interviewStatus,
  interviewStatusDefault,
  interviewType,
  interviewTypeDefault,
} = require("../constant/interviewStatus.enum.js");
module.exports = (sequelize, DataTypes) => {
  class Interviews extends Model {
    static associate(models) {
      // define association here
      Interviews.belongsTo(models.CandidateDetails, {
        foreignKey: "CandidateDetail_id",
      });
      Interviews.hasMany(models.Reports, { foreignKey: "Interview_id" });
      Interviews.belongsTo(models.Rooms, {
        foreignKey: "room",
      });
    }
  }
  Interviews.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(6),
        defaultValue: DataTypes.UUIDV4,
      },
      room: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Rooms",
          key: "id",
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(interviewType),
        defaultValue: interviewTypeDefault,
      },
      slot: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      week: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(interviewStatus),
        defaultValue: interviewStatusDefault,
      },
      CandidateDetail_id: {
        allowNull: false,
        type: DataTypes.STRING(6),
        references: {
          model: "CandidateDetails",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Interviews",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Interviews;
};
