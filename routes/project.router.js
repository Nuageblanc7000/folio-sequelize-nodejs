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
 * @openapi
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Récupérer tous les projets
 *     responses:
 *       '200':
 *         description: Succès de la requête
 */
projectRouter.get("/", projectController.getAll);

/**
 * @openapi
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Créer un nouveau projet
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *               - title
 *               - description
 *               - images
 *               - technologies
 *     responses:
 *       '201':
 *         description: Projet créé avec succès
 */
projectRouter.post(
  "/",
  authMiddleware(),
  roleMiddleware(),
  multerProjectMiddleware(),
  validatorModelMiddleware(schemaProject),
  projectController.create
);

/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Récupérer un projet spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du projet
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Succès de la requête
 */
projectRouter.get("/:id", projectController.getById);

/**
 * @openapi
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Mettre à jour un projet
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du projet
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imagesRemove:
 *                 type: array
 *                 items:
 *                   type: number
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *               - title
 *     responses:
 *       '200':
 *         description: Projet mis à jour avec succès
 */
projectRouter.put(
  "/:id",
  authMiddleware(),
  roleMiddleware("admin"),
  isOwnerMiddleware(Project),
  multerProjectMiddleware(),
  projectController.update
);
/**
 * @openapi
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Supprimer un projet
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du projet
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Projet supprimé avec succès
 */
projectRouter.delete(
  "/:id",
  authMiddleware(),
  roleMiddleware(),
  isOwnerMiddleware(Project),
  projectController.delete
);
module.exports = projectRouter;
