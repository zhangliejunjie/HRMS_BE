'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {

    static associate(models) {
      // define association here
      Jobs.hasMany(models.CandidateDetails, { foreignKey: 'Job_id', sourceKey: 'id' })
      Jobs.belongsTo(models.Categories, { foreignKey: 'id' })
      Jobs.belongsTo(models.Campaigns, { foreignKey: 'id' })

    }
  };
  Jobs.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(6)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
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
        min: 0
      }
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    Category_id: {
      allowNull: false,
      type: DataTypes.STRING(6),
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    Campaign_id: {
      allowNull: false,
      type: DataTypes.STRING(6),
      references: {
        model: 'Campaigns',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Jobs',
  });
  return Jobs;
};