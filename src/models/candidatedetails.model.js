"use strict";
const { Model } = require("sequelize");
const {
  applyStatus,
  applyStatusDefault,
} = require("../constant/cvStatus.enum.js");

module.exports = (sequelize, DataTypes) => {
  class CandidateDetails extends Model {
    static associate(models) {
      // define association here
      CandidateDetails.belongsTo(models.Members, { foreignKey: "Member_id" });
      CandidateDetails.belongsTo(models.Staffs, { foreignKey: "HRStaff_id" });
      CandidateDetails.belongsTo(models.Jobs, { foreignKey: "Job_id" });
      CandidateDetails.hasMany(models.Interviews, {
        foreignKey: "CandidateDetail_id",
      });
    }
  }
  CandidateDetails.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(6),
      },
      identity_number: {
        allowNull: false,
        type: DataTypes.STRING(12),
      },
      resume_url: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      applied_status: {
        allowNull: false,
        type: DataTypes.ENUM(applyStatus),
        defaultValue: applyStatusDefault,
      },
      dob: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      adress: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      Job_id: {
        allowNull: false,
        type: DataTypes.STRING(6),
        references: {
          model: "Jobs",
          key: "id",
        },
      },
      HRStaff_id: {
        allowNull: false,
        type: DataTypes.STRING(6),
        references: {
          model: "Staffs",
          key: "id",
        },
      },
      Member_id: {
        allowNull: false,
        type: DataTypes.STRING(6),
        references: {
          model: "Members",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CandidateDetails",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return CandidateDetails;
};