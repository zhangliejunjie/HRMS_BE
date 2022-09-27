"use strict";
import { Model } from "sequelize";
import { userStatus, userStatusDefault } from "../constant/userStatus.enum";
const { v4: uuidv4 } = require("uuid");
export default (sequelize, DataTypes) => {
  class Members extends Model {
    static associate(models) {
      // define association here
      Members.hasMany(models.CandidateDetails, {
        foreignKey: "Member_id",
        sourceKey: "id",
      });
    }
  }
  Members.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(6),
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
        type: DataTypes.STRING(45),
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
    },
    {
      sequelize,
      modelName: "Members",
    }
  );
  Members.beforeCreate((user) => (user.id = uuidv4()));
  return Members;
};
