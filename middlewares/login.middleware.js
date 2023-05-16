const userService = require("../services/user.service");
const { ErrorResponse } = require("../utils/Responses/Error.response");
const ErrorCode = require("../utils/Responses/code.error");

/**
 * Middleware de validation de connexion utilisateur.
 *
 * @function
 * @returns {function(import("express").Request,import("express").Response,import("express").NextFunction)}
 */
const loginMiddleWare = () => {
  return async (req, res, next) => {
    const { email } = req.body; // Récupère l'email de la requête.
    console.log(email);
    const emailExist = await userService.userEmailExist(email); // Vérifie si l'email existe dans la base de données.
    if (!emailExist) {
      // Si l'email n'existe pas, appelle la fonction middleware suivante avec une erreur.
      return next({ name: ErrorCode.USER_LOGIN_FAILED });
    }
    return next(); // Appelle la fonction middleware suivante si l'email existe.
  };
};

module.exports = loginMiddleWare;
