"use strict";
const { Model } = require("sequelize");
const { categoryStatus, categoryStatusDefault } = require("../constant/categoryStatus.enum");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      // define association here
      Categories.hasMany(models.Jobs, { foreignKey: "Category_id" });
    }
  }
  Categories.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(categoryStatus),
        defaultValue: categoryStatusDefault
      },
    },
    {
      sequelize,
      modelName: "Categories",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Categories;
};
