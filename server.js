const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const models = require("./models/");
const users = require("./routes/users");
const movies = require("./routes/movies");
const seasons = require("./routes/seasons");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/seasons",seasons)
app.get("/", (req, res) => res.send("Hello world"));
models.sequelize
  .authenticate()
  .then(function () {
    console.log("Connection successful");
  })
  .catch(function (error) {
    console.log("Error creating connection:", error);
  });

app.listen(4000);

module.exports = app;
