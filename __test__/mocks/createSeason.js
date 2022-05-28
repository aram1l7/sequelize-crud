const app = require("../../app");
const request = require("supertest");
const createMovie = require("./createMovie");
const createSeason = async () => {
  const movie = await createMovie();
  const szn = await request(app).post(`/api/seasons/${movie.body.id}`).send({
    title: "Test Season",
    description: "Lorem ipsum dolor",
  });
  return szn;
};

module.exports = createSeason;
