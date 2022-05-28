const app = require("../app");
const request = require("supertest");

describe("users", () => {
  test("returns the list of all users", async () => {
    const res = await request(app).get("/api/users/");
    expect(res.statusCode).toEqual(200);
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
  test("creates a new user", async () => {
    const res = await request(app).post("/api/users").send({ name: "Aram" });
    expect(res.statusCode).toEqual(201);
  });
  test("throws error if name is empty", async () => {
    const res = await request(app).post("/api/users").send({});
    expect(res.statusCode).toEqual(400);
  });
  test("throws error if trying to get user which doesnt exist", async () => {
    const res = await request(app).get("/api/users/999999999999");
    expect(res.statusCode).toEqual(400);
  });
  test("deletes a user", async () => {
    const newUser = await request(app)
      .post("/api/users")
      .send({ name: "John Doe 2" });
    const res = await request(app).delete(`/api/users/${newUser.body.id}`);
    expect(res.statusCode).toBe(200);
    const wrongReq = await request(app).delete("/api/users/99999999");
    expect(wrongReq.statusCode).toBe(400);
  });
  test("subscribes to a movie", async () => {
    const res = await Promise.all([
      request(app).post("/api/users").send({ name: "John Doe 3" }),
      request(app).post("/api/movies").send({
        title: "Test Movie",
        description: "Lorem ipsum",
      }),
    ]);
    await request(app)
      .post(`/api/users/${res[0].body.id}/movies/${res[1].body.id}`)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
  test("updates a user", async () => {
    const newUser = await request(app)
      .post("/api/users")
      .send({ name: "John Doe 4" });
    const res = await request(app).put(`/api/users/${newUser.body.id}`).send({
      name: "John Depp",
    });
    expect(res.statusCode).toBe(200);
  });
  test("throws error if updating user with empty name", async () => {
    const newUser = await request(app)
      .post("/api/users")
      .send({ name: "John Doe 5" });
    const res = await request(app)
      .put(`/api/users/${newUser.body.id}`)
      .send({ name: "" });
    expect(res.statusCode).toBe(400);
    let errorText = JSON.parse(res.error.text);
    expect(errorText).toEqual("Updated name shouldnt be empty");
  });
});
