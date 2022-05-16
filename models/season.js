("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    static associate(models) {
      this.belongsTo(models.Movie, {
        foreignKey: {
          name: "movie_id",
          allowNull: false,
        },
        as: "seasons",
        onDelete: "cascade",
      });
    }
  }
  Season.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "seasons",
      modelName: "Season",
    }
  );
  return Season;
};
