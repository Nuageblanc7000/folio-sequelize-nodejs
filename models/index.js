const { Sequelize } = require("sequelize");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "mariadb",
});

const DBMYSQL = {};
DBMYSQL.sequelize = sequelize;

DBMYSQL.Project = require("./project.model")(sequelize);
DBMYSQL.User = require("./user.model")(sequelize);
DBMYSQL.Technology = require("./technology.model")(sequelize);
DBMYSQL.Image = require("./image.model")(sequelize);
//reflection
//MANY TO MANY PROJECT TECHNO
DBMYSQL.Project.belongsToMany(DBMYSQL.Technology, {
  through: "Project_Technology",
});
DBMYSQL.Technology.belongsToMany(DBMYSQL.Project, {
  through: "Project_Technology",
});
//user 0 n ManyToOne
DBMYSQL.Project.belongsTo(DBMYSQL.User);
DBMYSQL.User.hasMany(DBMYSQL.Project);
DBMYSQL.Image.belongsTo(DBMYSQL.Project);
DBMYSQL.Project.hasMany(DBMYSQL.Image);

module.exports = DBMYSQL;
