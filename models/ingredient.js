("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      this.belongsToMany(models.Recipe, {
        through: "RecipeIngredient",
        foreignKey: "ingredientId",
        as: "recipes",
        onDelete: 'cascade',
      });
    }
  }
  Ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
