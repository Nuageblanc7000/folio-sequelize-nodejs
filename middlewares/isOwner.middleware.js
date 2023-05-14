const ErrorCode = require("../utils/Responses/code.error");

/**
 *
 * @param {import("sequelize").ModelStatic<any>} Model
 * @returns
 */
const isOwnerMiddleware = (Model) => {
  return async (req, res, next) => {
    if (!req.payload) {
      return next({ name: ErrorCode.ACCESS_DENIED });
    }
    const { id: userId } = req.payload;
    const entityId = req.params.id;
    const isOwner = await Model.findOne({
      where: { userId: userId, id: entityId },
    });

    if (!isOwner) {
      return next({ name: ErrorCode.ACCESS_DENIED });
    }
    return next();
  };
};

module.exports = isOwnerMiddleware;
