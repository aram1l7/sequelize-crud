const app = require("../app");
const request = require("supertest");
const createMovie = require("./mocks/createMovie");
const createSeason = require("./mocks/createSeason");
describe("seasons", () => {
  let sznMock = {};
  let statusCode;
  let movieId;
  beforeAll(async () => {
    const data = await createSeason();
    const movie = await createMovie();
    movieId = movie.body.id;
    sznMock = { ...data.body };
    statusCode = data.statusCode;
  });

  test("returns the list of all seasons", async () => {
    const res = await request(app).get("/api/seasons");
    expect(res.statusCode).toEqual(200);
  });
  test("creates a new season", async () => {
    expect(statusCode).toEqual(200);
  });
  test("gets season by id", async () => {
    await request(app)
      .get(`/api/seasons/${sznMock.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(sznMock.id);
        expect(res.body.name).toBe(sznMock.name);
        expect(res.body.movie_id).toBe(sznMock.movie_id);
      });
  });

  test("throws error if title,description is empty", async () => {
    const res = await request(app).post(`/api/seasons/${movieId}`).send({});
    expect(res.statusCode).toEqual(400);
    const emptyDesc = await request(app)
      .post(`/api/seasons/${movieId}`)
      .send({ title: "Test asdf" });
    expect(emptyDesc.statusCode).toEqual(400);
    const emptyTitle = await request(app)
      .post(`/api/seasons/${movieId}`)
      .send({ description: "Test asdf" });
    expect(emptyTitle.statusCode).toEqual(400);
  });
  test("throws error if trying to get season which doesnt exist", async () => {
    const res = await request(app).get(`/api/seasons/99999999999999`);
    expect(res.statusCode).toEqual(400);
  });
  test("updates a season", async () => {
    const update = await request(app).put(`/api/seasons/${sznMock.id}`).send({
      title: "Asdfdsfsf",
      description: "Lorem",
    });
    expect(update.statusCode).toBe(200);
  });
  test("throws error if trying to update a season with empty fields", async () => {
    const update = await request(app).put(`/api/seasons/${sznMock.id}`).send({
      title: "",
      description: "",
    });
    expect(update.statusCode).toBe(400);
    expect(JSON.parse(update.error.text)).toBe(
      "Cannot update season with empty title or description"
    );
  });
  test("throws error if trying to update a season that doesnt exist", async () => {
    await request(app)
      .put(`/api/seasons/9999999999`)
      .send({
        title: "Asdfdsfsf",
        description: "adsdsad",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  test("deletes a season", async () => {
    await request(app)
      .delete(`/api/seasons/${sznMock.id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
  test("throws error if trying to delete a season that doesnt exist", async () => {
    await request(app)
      .delete(`/api/seasons/9999999999`)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});
