("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMovies extends Model {
    static associate(models) {
      //code
    }
  }
  UserMovies.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user_movies",
      modelName: "UserMovies",
    }
  );
  return UserMovies;
};
