("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      this.belongsToMany(models.Ingredient, {
        through: "RecipeIngredient",
        foreignKey: {
          name: "recipeId",
          allowNull: false,
        },
        as: "ingredients",
        onDelete: "cascade",
      });
    }
  }
  Recipe.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
