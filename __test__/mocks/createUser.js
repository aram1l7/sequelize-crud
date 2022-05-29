const app = require("../../app");
const request = require("supertest");
const createUser = async () => {
  const newUser = await request(app).post(`/api/users`).send({
    name: "John Doe",
  });
  return newUser;
};

module.exports = createUser;
