'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {

    static associate(models) {
      // define association here
      Categories.hasMany(Jobs, { foreignKey: 'Category_id', sourceKey: 'id' })
    }
  };
  Categories.init({
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
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};