"use strict";
const { Model } = require("sequelize");
const {
  interviewStatus,
  interviewStatusDefault,
} = require("../src/constant/interviewStatus.enum.js");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Interviews extends Model {
    static associate(models) {
      // define association here
      Interviews.belongsTo(models.CandidateDetails, {
        foreignKey: "CandidateDetail_id",
      });
      Interviews.belongsTo(models.Staffs, { foreignKey: "Interviewer_id" });
    }
  }
  Interviews.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
      },
      room: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(interviewStatus),
        defaultValue: interviewStatusDefault,
      },
      mark: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.TEXT,
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
      CandidateDetail_id: {
        allowNull: false,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
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
