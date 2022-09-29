'use strict';
const {
  Model
} = require('sequelize');
const { userStatus, userStatusDefault } = require('../src/constant/userStatus.enum.js');

module.exports = (sequelize, DataTypes) => {
  class Members extends Model {

    static associate(models) {
      // define association here
      Members.hasMany(models.CandidateDetails, { foreignKey: 'Member_id' })
    }
  };
  Members.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(6)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(320)
    },
    fullname: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    current_resume_url: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(userStatus),
      defaultValue: userStatusDefault
    }
  }, {
    sequelize,
    modelName: 'Members',
    createdAt: false,
    updatedAt: false
  });
  return Members;
};