require("dotenv").config();

if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}
const asyncErrors = require("express-async-errors");
const cookieParser = require("cookie-parser");
const { PORT, SECRET_COOKIE_KEY } = process.env;
const express = require("express");
const app = express();
const path = require("path");
const db = require("./schemas");
const router = require("./routes");
const ErrorCode = require("./utils/Responses/code.error");
const errorHandler = require("./utils/Responses/error.handler");
require("./schemas");
const DBMYSQL = require("./models");

DBMYSQL.sequelize
  .authenticate({})
  .then(() => console.log("mysqldb ok"))
  .catch((err) => {
    console.log(err);
  });
// DBMYSQL.sequelize.drop({ benchmark: true });
DBMYSQL.sequelize.sync();
app.use(express.json());
app.use(cookieParser(SECRET_COOKIE_KEY));
app.use(express.static(path.join(__dirname, "public", "uploads")));

app.use("/api", router);

app.use((err, req, res, next) => {
  const errorType = err.name || ErrorCode.INTERNAL_SERVER_ERROR;
  const handler = errorHandler[errorType] || errorHandler.default;
  handler(err, res);
});

if (typeof PhusionPassenger !== "undefined") {
  app.listen("passenger");
} else {
  app.listen(PORT);
}
