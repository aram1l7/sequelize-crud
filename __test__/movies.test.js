const app = require("../app");
const request = require("supertest");

describe("movies", () => {
  test("returns the list of all movies", async () => {
    const res = await request(app).get("/api/movies");
    expect(res.statusCode).toEqual(200);
  });
  test("gets movie by id", async () => {
    const newMovie = await request(app).post("/api/movies").send({
      title: "Test Movie 2",
      description: "Lorem ipsum asdasd",
    });
    await request(app)
      .get(`/api/movies/${newMovie.body.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(newMovie.body.id);
        expect(res.body.name).toBe(newMovie.body.name);
      });
  });
  test("creates a new movie", async () => {
    const res = await request(app).post("/api/movies").send({
      title: "Test Movie 3",
      description: "Hello world asdfasd",
    });
    expect(res.statusCode).toEqual(201);
  });
  test("throws error if title or description is empty", async () => {
    const res = await request(app).post("/api/movies").send({});
    expect(res.statusCode).toEqual(400);
    const emptyDesc = await request(app)
      .post("/api/movies")
      .send({ title: "Test asdf" });
    expect(emptyDesc.statusCode).toEqual(400);
    const emptyTitle = await request(app)
      .post("/api/movies")
      .send({ description: "Test asdf" });
    expect(emptyTitle.statusCode).toEqual(400);
  });
  test("throws error if trying to get movie which doesnt exist", async () => {
    const res = await request(app).get(`/api/movies/99999999999999`);
    expect(res.statusCode).toEqual(400);
  });
  test("updates a movie", async () => {
    const newMovie = await request(app).post("/api/movies").send({
      title: "Test Movie 4",
      description: "Hello world asdfasd",
    });
    const update = await request(app)
      .put(`/api/movies/${newMovie.body.id}`)
      .send({
        title: "Asdfdsfsf",
        description: "Lorem",
      });
    expect(update.statusCode).toBe(200);
  });
  test("throws error if trying to update a movie with empty fields", async () => {
    const newMovie = await request(app).post("/api/movies").send({
      title: "Test Movie 5",
      description: "Hello world asdfasd",
    });
    const update = await request(app)
      .put(`/api/movies/${newMovie.body.id}`)
      .send({
        title: "",
        description: "",
      });
    expect(update.statusCode).toBe(400);
    expect(JSON.parse(update.error.text)).toBe(
      "Cannot update movie with empty title or description"
    );
  });
  test("throws error if trying to update a movie that doesnt exist", async () => {
    await request(app)
      .put(`/api/movies/9999999999`)
      .send({
        title: "Asdfdsfsf",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  test("deletes a movie", async () => {
    const newMovie = await request(app).post("/api/movies").send({
      title: "Test Movie 6",
      description: "Hello world asdfasd",
    });
    await request(app)
      .delete(`/api/movies/${newMovie.body.id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
  test("throws error if trying to delete a movie that doesnt exist", async () => {
    await request(app)
      .delete(`/api/movies/9999999999`)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});
