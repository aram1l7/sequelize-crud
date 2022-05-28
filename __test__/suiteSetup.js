const models = require("../models");
beforeAll(async () => {
  await models.sequelize.sync({ force: true });
});
afterAll(() => models.sequelize.close());
