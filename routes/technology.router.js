const technologyController = require("../controllers/technology.controller");
const authMiddleware = require("../middlewares/jwt.middleware");
const roleMiddleware = require("../middlewares/role.mddleware");

/**
 * @swagger
 * tags:
 *   name: Technologies
 *   description: API pour les technologies
 */

const technologyRouter = require("express").Router();

/**
 * @swagger
 * /api/technologies:
 *   get:
 *     summary: Obtenir toutes les technologies
 *     tags: [Technologies]
 *     responses:
 *       200:
 *         description: Succès
 */
technologyRouter.get("/", technologyController.getAll);

/**
 * @swagger
 * /api/technologies:
 *   post:
 *     summary: Créer une technologie
 *     tags: [Technologies]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               icon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Succès
 */
technologyRouter.post("/", authMiddleware(), technologyController.create);

/**
 * @swagger
 * /api/technologies/{id}:
 *   get:
 *     summary: Obtenir une technologie par ID
 *     tags: [Technologies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *        200:
 *          description: Succès
 */
technologyRouter.get("/:id", technologyController.getById);

/**
 * @swagger
 * /api/technologies/{id}:
 *   put:
 *     summary: Mettre à jour une technologie
 *     tags: [Technologies]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès
 */
technologyRouter.put("/:id", authMiddleware(), technologyController.update);

/**
 * @swagger
 * /api/technologies/{id}:
 *   delete:
 *     summary: Supprimer une technologie
 *     tags: [Technologies]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 */
technologyRouter.delete("/:id", authMiddleware(), technologyController.delete);

module.exports = technologyRouter;
