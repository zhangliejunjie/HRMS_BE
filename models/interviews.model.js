'use strict';
const {
  Model
} = require('sequelize');
const { interviewStatus, interviewStatusDefault } = require('../constant/interviewStatus.enum');
module.exports = (sequelize, DataTypes) => {
  class Interviews extends Model {

    static associate(models) {
      // define association here
      Interviews.belongsTo(models.CandidateDetails, { foreignKey: 'id' });
      Interviews.belongsTo(models.Staffs, { foreignKey: 'id' });
    }
  };
  Interviews.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(6)
    },
    room: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    start_time: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end_time: {
      allowNull: false,
      type: DataTypes.DATE
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(interviewStatus),
      defaultValue: interviewStatusDefault
    },
    mark: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    Interviewer_id: {
      allowNull: false,
      type: DataTypes.STRING(6),
      references: {
        model: 'Staffs',
        key: 'id'
      }
    },
    CandidateDetail_id: {
      allowNull: false,
      type: DataTypes.STRING(6),
      references: {
        model: 'CandidateDetails',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Interviews',
  });
  return Interviews;
};