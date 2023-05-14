const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/jwt.middleware");
const loginMiddleWare = require("../middlewares/login.middleware");
const validatorModelMiddleware = require("../middlewares/validator.middleware");
const schemaUser = require("../validators/user.validator");

const authRouter = require("express").Router();
authRouter.post(
  "/register",
  validatorModelMiddleware(schemaUser),
  authController.register
);
authRouter.get("/logout", authMiddleware(), authController.logout);
authRouter.post("/login", loginMiddleWare(), authController.login);

module.exports = authRouter;
