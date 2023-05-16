const ErrorCode = require("../utils/Responses/code.error");
const { decode } = require("../utils/jwt.utils");

/**
 * Middleware qui vérifie si l'utilisateur est authentifié.
 *
 * @function
 * @returns {function(import("express").Request,import("express").Response,import("express").NextFunction)}
 */
const authMiddleware = () => {
  return async (req, res, next) => {
    // Vérifie si un token est présent dans les cookies
    if (!req.cookies.token) {
      // Si aucun token n'est trouvé, renvoie une erreur de token JWT invalide
      return next({ name: ErrorCode.ACCESS_DENIED });
    }
    // Décode le token JWT
    const payload = await decode(req.cookies.token);
    console.log(payload);
    // Ajoute le payload du token à la requête
    req.payload = payload;

    return next();
  };
};

module.exports = authMiddleware;
