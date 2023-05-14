const projectController = require("../controllers/project.controller");
const isOwnerMiddleware = require("../middlewares/isOwner.middleware");
const authMiddleware = require("../middlewares/jwt.middleware");
const { multerProjectMiddleware } = require("../middlewares/multer.middleware");
const roleMiddleware = require("../middlewares/role.mddleware");
const validatorModelMiddleware = require("../middlewares/validator.middleware");
const { Project } = require("../models");
const schemaProject = require("../validators/project.validator");

const projectRouter = require("express").Router();

/**
 * Route pour récupérer tous les projets
 * Middleware : authMiddleware
 */
projectRouter.route("/").get(projectController.getAll).post(
  /**
   * Middleware : authMiddleware, roleMiddleware, multerProjectMiddleware, projectValidateMiddleware
   * But : Vérification des autorisations, des rôles, de la validité des technologies, du format de l'image et de la validité des données du projet
   */
  authMiddleware(),
  roleMiddleware(),

  multerProjectMiddleware(),
  validatorModelMiddleware(schemaProject),
  projectController.create
);

/**
 * Route pour récupérer un projet en particulier
 * Middleware : Aucun
 */
projectRouter
  .route("/:id")
  .get(projectController.getById)
  .put(
    /**
     * Middleware : authMiddleware, roleMiddleware, checkTechMiddleware, multerProjectMiddleware, projectValidateMiddleware
     * But : Vérification des autorisations, des rôles, de la validité des technologies, du format de l'image et de la validité des données du projet
     */
    authMiddleware(),
    roleMiddleware("admin"),
    isOwnerMiddleware(Project),
    multerProjectMiddleware(),
    projectController.update
  )
  .delete(
    /**
     * Middleware : authMiddleware, roleMiddleware
     * But : Vérification des autorisations et des rôles
     */
    authMiddleware(),
    roleMiddleware(),
    isOwnerMiddleware(Project),
    projectController.delete
  );

/**
 * Route pour supprimer une image associée à un projet
 * Middleware : authMiddleware, roleMiddleware
 * But : Vérification des autorisations et des rôles
 */
projectRouter
  .route("/:id/images/:imageId")
  .delete(
    authMiddleware(),
    roleMiddleware(),
    isOwnerMiddleware(Project),
    projectController.deleteImage
  );

module.exports = projectRouter;
