const userService = require("../services/user.service");
const { SuccessResponse } = require("../utils/Responses/Succes.response");
const ErrorCode = require("../utils/Responses/code.error");

const userController = {
  getAll: async (req, res, next) => {
    const { limit, skip } = req.query;
    const users = await userService.getAll(limit, skip);
    res.status(200).json(new SuccessResponse(users));
  },
  getByid: async (req, res, next) => {
    const id = req.params.id;
    const user = await userService.getById(id);
    res.status(200).json(new SuccessResponse(user));
  },
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  update: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const user = await userService.update(id, body);

    res.status(204).json(new SuccessResponse(user, 204));
  },
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  delete: async (req, res, next) => {
    const payload = req.payload;
    const id = +req.params.id;
    console.log(payload.id, id);
    if (id !== payload.id) {
      return next({ name: ErrorCode.FORBIDEN_ERROR });
    }
    res.clearCookie("token");
    res.status(204).json(
      new SuccessResponse(
        {
          message: "projet id:" + (id ? id : ""),
        },
        204
      )
    );
  },
};

module.exports = userController;
