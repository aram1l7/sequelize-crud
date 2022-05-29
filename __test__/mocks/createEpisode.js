const app = require("../../app");
const request = require("supertest");
const createSeason = require("./createSeason");
const createEpisode = async () => {
  const season = await createSeason();
  const episode = await request(app)
    .post(`/api/episodes/${season.body.id}`)
    .send({
      title: "Test Episode",
      about: "Lorem ipsum dolor",
    });
  return episode;
};

module.exports = createEpisode;
