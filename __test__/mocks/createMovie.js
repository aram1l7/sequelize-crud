const app = require("../../app");
const request = require("supertest");
const createMovie = async () => {
  const newMovie = await request(app).post(`/api/movies`).send({
    title: "Test Movie",
    description: "Lorem ipsum asdasd",
  });
  return newMovie;
};

module.exports = createMovie;
