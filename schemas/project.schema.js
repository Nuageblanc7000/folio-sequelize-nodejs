const mongoose = require("mongoose");

/**
 * Schéma pour les images d'un projet.
 */
const imageSchema = mongoose.Schema({
  path: String,
});

/**
 * Schéma pour un projet.
 */
const projectSchema = mongoose.Schema({
  title: { type: String, required: [true, "Ce champ est obligatoire"] },
  description: { type: String, required: [true, "Ce champ est obligatoire"] },
  images: {
    type: [imageSchema],
  },
  createdby: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  technologies: [{ type: mongoose.Types.ObjectId, ref: "technologies" }],
});

/**
 * Modèle pour un projet.
 * @typedef {import('mongoose').Model<Project>} ProjectModel
 */

module.exports = Project = mongoose.model("projects", projectSchema);
