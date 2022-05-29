const app = require("../app");
const request = require("supertest");
const createEpisode = require("./mocks/createEpisode");
describe("episodes", () => {
  let episodeMock = {};
  let statusCode;
  beforeAll(async () => {
    const episode = await createEpisode();
    episodeMock = { ...episode.body };
    statusCode = episode.statusCode;
  });

  test("returns the list of all episodes", async () => {
    const res = await request(app).get("/api/episodes");
    expect(res.statusCode).toEqual(200);
  });
  test("creates a new episode", async () => {
    expect(statusCode).toEqual(201);
  });
  test("gets episode by id", async () => {
    await request(app)
      .get(`/api/episodes/${episodeMock.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(episodeMock.id);
        expect(res.body.name).toBe(episodeMock.name);
        expect(res.body.season_id).toBe(episodeMock.season_id);
      });
  });

  test("throws error if title, about is empty", async () => {
    const res = await request(app)
      .post(`/api/episodes/${episodeMock.season_id}`)
      .send({});
    expect(res.statusCode).toEqual(400);
    const emptyDesc = await request(app)
      .post(`/api/episodes/${episodeMock.season_id}`)
      .send({ title: "Test asdf" });
    expect(emptyDesc.statusCode).toEqual(400);
    const emptyTitle = await request(app)
      .post(`/api/episodes/${episodeMock.season_id}`)
      .send({ about: "Test asdf" });
    expect(emptyTitle.statusCode).toEqual(400);
  });
  test("throws error if trying to get episode which doesnt exist", async () => {
    const res = await request(app).get(`/api/episodes/99999999999999`);
    expect(res.statusCode).toEqual(400);
  });
  test("updates an episode", async () => {
    const update = await request(app)
      .put(`/api/episodes/${episodeMock.id}`)
      .send({
        title: "Asdfdsfsf",
        about: "Lorem",
      });
    expect(update.statusCode).toBe(200);
  });
  test("throws error if trying to update a season with empty fields", async () => {
    const update = await request(app)
      .put(`/api/episodes/${episodeMock.id}`)
      .send({
        title: "",
        description: "",
      });
    expect(update.statusCode).toBe(400);
    expect(JSON.parse(update.error.text)).toBe(
      "Cannot update episode with empty title or about field"
    );
  });
  test("throws error if trying to update an episode that doesnt exist", async () => {
    await request(app)
      .put(`/api/episodes/9999999999`)
      .send({
        title: "Asdfdsfsf",
        description: "adsdsad",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  test("deletes an episode", async () => {
    await request(app)
      .delete(`/api/episodes/${episodeMock.id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
  test("throws error if trying to delete an episode which doesnt exist", async () => {
    await request(app)
      .delete(`/api/episodes/9999999999`)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});
