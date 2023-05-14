const mongoose = require("mongoose");
const technoSchema = require("./technology.schema");
const { DB_URI_MONGOOSE } = process.env;

const db = {};
db.connect = async () => {
  try {
    await mongoose
      .connect(DB_URI_MONGOOSE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 14000,
      })
      .then(() => console.log("connection ok"));
  } catch (err) {
    console.log(err);
    return err;
  }
};
db.connect();

db.Technology = require("./technology.schema");
db.User = require("./user.schema");
db.Project = require("./project.schema");
module.exports = db;
