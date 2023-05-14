const { User } = require("../models");
const userService = require("../services/user.service");
const ErrorCode = require("../utils/Responses/code.error");
/**
 *
 * @param {string} accessRole
 * @returns
 */
const roleMiddleware = (accessRole = "admin") => {
  return async (req, res, next) => {
    const { id } = req.payload;
    const user = await User.findByPk(id);
    if (!user || user.role !== accessRole) {
      return next({ name: ErrorCode.ACCESS_DENIED });
    }

    return next();
  };
};

module.exports = roleMiddleware;
