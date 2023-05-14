const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/jwt.middleware");
const roleMiddleware = require("../middlewares/role.mddleware");

const userRouter = require("express").Router();
userRouter.route("/").get(
  authMiddleware(),
  // roleMiddleware(),
  userController.getAll
);
userRouter
  .route("/:id")
  .get(userController.getByid)
  .put(authMiddleware(), userController.update)
  .delete(authMiddleware(), userController.delete);
module.exports = userRouter;
