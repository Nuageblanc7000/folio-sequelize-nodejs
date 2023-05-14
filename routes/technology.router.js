const technologyController = require("../controllers/technology.controller");
const authMiddleware = require("../middlewares/jwt.middleware");
const roleMiddleware = require("../middlewares/role.mddleware");

const technologyRouter = require("express").Router();
technologyRouter.route("/").get(technologyController.getAll).post(
  authMiddleware(),
  // roleMiddleware("admin"),

  technologyController.create
);
technologyRouter
  .route("/:id")
  .get(technologyController.getById)
  .put(authMiddleware(), technologyController.update)
  .delete(authMiddleware(), technologyController.delete);

module.exports = technologyRouter;
