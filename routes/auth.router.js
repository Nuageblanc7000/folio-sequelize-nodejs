/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: API pour l'authentification
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Permet de s'inscrire
 *     tags: [Auth]
 *     requestBody:
 *       description: Données d'inscription
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Requête invalide ou utilisateur déjà existant
 */

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     summary: Permet de se déconnecter
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Non authentifié
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Permet de se connecter
 *     tags: [Auth]
 *     requestBody:
 *       description: Données de connexion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Requête invalide ou identifiants incorrects
 */

const authRouter = require("express").Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         firstname: JohnDoe
 *         lastname:  do
 *         email: johndoe@example.com
 *         password: password123
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 */

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/jwt.middleware");
const loginMiddleWare = require("../middlewares/login.middleware");
const validatorModelMiddleware = require("../middlewares/validator.middleware");
const schemaLogin = require("../validators/login.validator");
const schemaUser = require("../validators/user.validator");

authRouter.post(
  "/register",
  validatorModelMiddleware(schemaUser),
  authController.register
);

authRouter.get("/logout", authMiddleware(), authController.logout);

authRouter.post(
  "/login",
  validatorModelMiddleware(schemaLogin),
  loginMiddleWare(),
  authController.login
);

module.exports = authRouter;
