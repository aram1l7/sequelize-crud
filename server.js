const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const models = require("./models/");

const recipes = require("./routes/recipes");
const ingredients = require("./routes/ingredients");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/recipes", recipes);
app.use("/ingredients", ingredients);
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
