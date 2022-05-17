"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Aram",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arsen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vzgo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "movies",
      [
        {
          title: "Batman",
          description: "asdasdasd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Joker",
          description: "asdadsd2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Forsaj",
          description: "asdadsd3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "seasons",
      [
        {
          title: "Season 1",
          movie_id: 1,
          description: "lorem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Season 2",
          movie_id: 2,
          description: "ipsum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Season 3",
          movie_id: 3,
          description: "lorem ipsum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "episodes",
      [
        {
          title: "Episode 1",
          about: "lorem",
          season_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Episode 2",
          about: "ipsum",
          season_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Episode 3",
          about: "lorem ipsum",
          season_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("movies", null, {});
    await queryInterface.bulkDelete("seasons", null, {});
    await queryInterface.bulkDelete("episodes", null, {});
  },
};
