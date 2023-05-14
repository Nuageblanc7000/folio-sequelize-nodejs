const fileService = require("../services/file.service");

const validatorModelMiddleware = (schema) => {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  return async (req, res, next) => {
    try {
      const body = req.body;
      if ((req.files, body?.images)) {
        body.images = req.files.map((f) => (f = { path: f.filename }));
      }
      const project = await schema.validate(body, { abortEarly: false });
    } catch (err) {
      if (req.files) {
        fileService.deleteFile(req.files);
      }
      return next(err);
    }
    return next();
  };
};
module.exports = validatorModelMiddleware;
