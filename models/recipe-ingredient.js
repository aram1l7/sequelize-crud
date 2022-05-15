("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    static associate(models) {
      //code
    }
  }
  RecipeIngredient.init(
    {
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meassurementAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meassurementType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RecipeIngredient",
    }
  );
  return RecipeIngredient;
};
