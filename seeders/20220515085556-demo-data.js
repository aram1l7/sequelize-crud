"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Ingredients",
      [
        {
          name: "Kechus",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peperoni",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mayonez",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Recipes",
      [
        {
          title: "Makaron",
          description: "asdadsd",
          instructions: "lorem ipsum dolor sit amet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Greshka",
          description: "asdadsd2",
          instructions: "lorem ipsum dolor sit amet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Salad",
          description: "asdadsd3",
          instructions: "lorem ipsum dolor sit amet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ingredients", null, {});
    await queryInterface.bulkDelete("Recipes", null, {});
  },
};
