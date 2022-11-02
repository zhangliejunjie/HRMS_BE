"use strict";
const { Model } = require("sequelize");
const {
  roomType,
  roomStatus,
  roomStatusDefault,
} = require("../constant/room.enum");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rooms.hasMany(models.Interviews, { foreignKey: "room" });
    }
  }
  Rooms.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      zoom_id: {
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      topic: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      join_url: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      start_url: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      pwd: {
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(roomType),
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(roomStatus),
        default: roomStatusDefault,
      },
    },
    {
      sequelize,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
