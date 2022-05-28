require("dotenv").config(); // this is important!
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "admin",
    password: "admin",
    database: "sequelize",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "admin",
    password: "admin",
    database: "sequelize",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
