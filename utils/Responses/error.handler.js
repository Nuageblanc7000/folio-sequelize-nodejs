const {
  ErrorFileResponse,
  ErrorValidatorResponse,
  ErrorResponse,
  ErrorGlobal,
} = require("./Error.response");
const ErrorCode = require("./code.error");

// Les gestionnaires d'erreurs pour chaque type d'erreur
const errorHandler = {
  [ErrorCode.MULTER_ERROR]: (err, res) => {
    res.status(400).json(new ErrorFileResponse(err, "", 400));
  },
  [ErrorCode.VALIDATOR_ERROR]: (err, res) => {
    console.log(err);
    return res.status(400).json(new ErrorValidatorResponse(err));
  },
  [ErrorCode.CAST_MONGOOSE_ERROR]: (err, res) => {
    return res.status(404).json(new ErrorResponse("NOT FOUND", null, err, 404));
  },
  [ErrorCode.JWT_TOKEN_INVALID]: (err, res) => {
    return res
      .status(401)
      .json(new ErrorResponse("Token invalid", "token", {}, 401));
  },
  [ErrorCode.USER_LOGIN_FAILED]: (err, res) => {
    return res
      .status(400)
      .json(new ErrorResponse("Email ou mot de passe invalide", "global", 400));
  },
  [ErrorCode.FORBIDEN_ERROR]: (err, res) => {
    return res
      .status(403)
      .json(
        new ErrorResponse(
          "Accès non autorisé à la ressource",
          "global",
          null,
          403
        )
      );
  },
  [ErrorCode.ACCESS_DENIED]: (err, res) => {
    return res
      .status(401)
      .json(
        new ErrorResponse(
          "Non authentifié. Veuillez vous connecter pour accéder à la ressource.",
          "global",
          null,
          401
        )
      );
  },
  default: (err, res) => {
    return res
      .status(422)
      .json(new ErrorGlobal("une erreur est survenue", null, err.stack, 422));
  },
};

module.exports = errorHandler;
