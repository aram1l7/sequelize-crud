const db = require("../models");
beforeAll(async () => {
  await db.sequelize.sync({ alter: true });
});
afterAll(() => db.sequelize.close());
