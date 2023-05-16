const ErrorCode = require("../utils/Responses/code.error");
const { ModelStatic } = require("sequelize");
/**
 *
 * @param {ModelStatic<any>} Model
 * @returns
 */
const isOwnerMiddleware = (Model) => {
  return async (req, res, next) => {
    if (!req.payload) {
      return next({ name: ErrorCode.ACCESS_DENIED });
    }
    const { id: userId } = req.payload;
    const entityId = +req.params.id;
    const a = await Model.findOne({ where: { id: entityId } });
    const isOwner = await Model.findOne({
      where: { UserId: userId, id: entityId },
    });
    if (!isOwner) {
      return next({ name: ErrorCode.FORBIDEN_ERROR });
    }
    return next();
  };
};

module.exports = isOwnerMiddleware;
