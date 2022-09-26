'use strict';
const {
  Model
} = require('sequelize');
const { role, roleDefault } = require('../constant/role.enum');
const { userStatus, userStatusDefault } = require('../constant/userStatus.enum');

module.exports = (sequelize, DataTypes) => {
  class Staffs extends Model {

    static associate(models) {
      // define association here
      Staffs.hasMany(models.Interviews, { foreignKey: 'Interviewer_id', sourceKey: 'id' })
      Staffs.hasMany(models.CandidateDetails, { foreignKey: 'CandidateDetail_id', sourceKey: 'id' })

    }
  };
  Staffs.init({
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
    role: {
      allowNull: false,
      type: DataTypes.ENUM(role),
      defaultValue: roleDefault
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(userStatus),
      defaultValue: userStatusDefault
    }
  }, {
    sequelize,
    modelName: 'Staffs',
  });
  return Staffs;
};