const authService = require("../services/auth.service");

const { SuccessResponse } = require("../utils/Responses/Succes.response");
const ErrorCode = require("../utils/Responses/code.error");
const jwt = require("../utils/jwt.utils");
const session = require("express-session");
const authController = {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  register: async (req, res, next) => {
    const newUser = req.body;
    const user = await authService.register(newUser);
    const { id, role } = user;
    const token = await jwt.generate(id, role);
    res.status(201).json(new SuccessResponse({ user, token }));
  },
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user) {
      return next({ name: ErrorCode.USER_LOGIN_FAILED });
    }
    const token = await jwt.generate({
      role: user.role,
      id: user.id,
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user, token });
  },
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  logout: async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logout" });
  },
};

module.exports = authController;
