require("dotenv").config();
if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

require("express-async-errors");
const cookieParser = require("cookie-parser");
const { PORT, SECRET_COOKIE_KEY } = process.env;
const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes");
const ErrorCode = require("./utils/Responses/code.error");
const errorHandler = require("./utils/Responses/error.handler");
const swagerDocs = require("./docs/swager");
const DBMYSQL = require("./models");
const session = require("express-session");

app.use(
  session({
    secret: SECRET_COOKIE_KEY,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.get("/", (req, res, next) => {
  res.status(200).json("salut");
});
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

swagerDocs(app, PORT);
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
