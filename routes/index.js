const projectController = require("../controllers/project.controller");
const userController = require("../controllers/user.controller");
const authRouter = require("./auth.router");
const projectRouter = require("./project.router");
const technologyRouter = require("./technology.router");
const userRouter = require("./user.router");

const router = require("express").Router();
router.use("/auth", authRouter);
router.use("/projects", projectRouter);
router.use("/technologies", technologyRouter);
router.use("/users", userRouter);
module.exports = router;
