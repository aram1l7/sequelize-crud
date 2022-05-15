("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "user_movies",
        foreignKey: "movie_id",
        as: "users",
        onDelete: "cascade",
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "movies",
      modelName: "Movie",
    }
  );
  return Movie;
};
