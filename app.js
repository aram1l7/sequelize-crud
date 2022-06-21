const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const models = require("./models");
const users = require("./routes/users");
const movies = require("./routes/movies");
const seasons = require("./routes/seasons");
const episodes = require("./routes/episodes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 4000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie CRUD api",
      version: "1.0.0",
      description: "Sequelize CRUD api",
    },
    servers: [
      {
        url: "https://sequelize-crud.herokuapp.com",
      },
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
app.use(
  cors({ origin: "https://sequelize-crud.herokuapp.com", credentials: true })
);

const swaggerSpec = swaggerJsDoc(options);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/seasons", seasons);
app.use("/api/episodes", episodes);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

models.sequelize
  .authenticate()
  .then(function () {
    console.log("Connection successful");
  })
  .catch(function (error) {
    console.log("Error creating connection:", error);
  });

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}
module.exports = app;
