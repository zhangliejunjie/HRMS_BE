"use strict";
const { Model } = require("sequelize");
const {
  userStatus,
  userStatusDefault,
} = require("../constant/userStatus.enum.js");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    static associate(models) {
      // define association here
      Members.hasMany(models.CandidateDetails, { foreignKey: "Member_id" });
    }
  }
  Members.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(320),
      },
      fullname: {
        allowNull: false,
        type: DataTypes.STRING(60),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(60),
      },
      avatar: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      current_resume_url: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(userStatus),
        defaultValue: userStatusDefault,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(13),
      },
      address: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      verified_code: {
        allowNull: true,
        type: DataTypes.STRING(4),
      },
      is_employee: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Members",
      createdAt: false,
      updatedAt: false,
    }
  );
  Members.beforeCreate((user) => (user.id = uuidv4()));

  return Members;
};
