const { multerProjectConfig } = require("../config/multer");
const { ErrorResponse } = require("../utils/Responses/Error.response");

/**
 * Middleware de configuration Multer pour la gestion de plusieurs images envoyées dans une requête
 *
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void} Middleware d'upload de plusieurs images avec Multer
 */
const multerProjectMiddleware = () => {
  return (req, res, next) => {
    if (!req.body.hasOwnProperty("images")) {
      return res
        .status(400)
        .json(new ErrorResponse("Le champ 'images' est obligatoire", "images"));
    }
    multerProjectConfig.array("images")(req, res, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  };
};

/**
 * Middleware de configuration Multer pour la gestion d'une image envoyée dans une requête
 *
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void} Middleware d'upload d'une image avec Multer
 */
const multerTechnoMiddleware = () => {
  return (req, res, next) => {
    multerProjectConfig.single("icon")(req, res, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  };
};

module.exports = { multerTechnoMiddleware, multerProjectMiddleware };
