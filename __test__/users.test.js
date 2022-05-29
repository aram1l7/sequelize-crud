const app = require("../app");
const request = require("supertest");
const createMovie = require("./mocks/createMovie");

describe("users", () => {
  let userMock = {};
  let movieId;
  beforeAll(async () => {
    const movie = await createMovie();
    movieId = movie.body.id;
  });

  test("returns the list of all users", async () => {
    const res = await request(app).get("/api/users/");
    expect(res.statusCode).toEqual(200);
  });
  test("creates a new user", async () => {
    const res = await request(app).post("/api/users").send({ name: "Aram" });
    userMock = { ...res.body };
    expect(res.statusCode).toEqual(201);
  });
  test("gets user by id", async () => {
    const newUser = await request(app)
      .post("/api/users")
      .send({ name: "John Doe" });
    await request(app)
      .get(`/api/users/${newUser.body.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(newUser.body.id);
        expect(res.body.name).toBe(newUser.body.name);
      });
  });

  test("throws error if name is empty", async () => {
    const res = await request(app).post("/api/users").send({});
    expect(res.statusCode).toEqual(400);
  });
  test("throws error if trying to get user which doesnt exist", async () => {
    const res = await request(app).get("/api/users/999999999999");
    expect(res.statusCode).toEqual(400);
  });
  test("updates a user", async () => {
    const res = await request(app).put(`/api/users/${userMock.id}`).send({
      name: "John Depp",
    });
    expect(res.statusCode).toBe(200);
  });
  test("throws error if updating user with empty name", async () => {
    const res = await request(app)
      .put(`/api/users/${userMock.id}`)
      .send({ name: "" });
    expect(res.statusCode).toBe(400);
    let errorText = JSON.parse(res.error.text);
    expect(errorText).toEqual("Updated name shouldnt be empty");
  });

  test("subscribes to a movie", async () => {
    await request(app)
      .post(`/api/users/${userMock.id}/movies/${movieId}`)
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(201);
      });
  });

  test("deletes a user", async () => {
    const res = await request(app).delete(`/api/users/${userMock.id}`);
    expect(res.statusCode).toBe(200);
    const wrongReq = await request(app).delete("/api/users/99999999");
    expect(wrongReq.statusCode).toBe(400);
  });
});
