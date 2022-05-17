"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    static associate(models) {
      this.belongsTo(models.Season, {
        foreignKey: {
          name: "season_id",
          allowNull: false,
        },
        as: "episodes",
        onDelete: "cascade",
      });
    }
  }
  Episode.init(
    {
      title: DataTypes.STRING,
      about: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "episodes",
      modelName: "Episode",
    }
  );
  return Episode;
};
