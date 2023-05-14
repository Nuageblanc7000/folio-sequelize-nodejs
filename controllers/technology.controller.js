const technologyService = require("../services/technology.service");
const { SuccessResponse } = require("../utils/Responses/Succes.response");

const technologyController = {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  getAll: async (req, res, next) => {
    const technologies = await technologyService.getAll();
    res.status(200).json(technologies);
  },
  getById: async (req, res, next) => {
    const id = req.params.id;
    const technology = await technologyService.getById(id);
    res.status(200).json(technology);
  },
  create: async (req, res, next) => {
    const id = req.params.id;
    const newtechnology = req.body;
    if (req.file) {
      console.log(req.file);
      newtechnology.icon = req.file.filename;
    }
    const technology = await technologyService.create(newtechnology);
    res.status(201).json(new SuccessResponse(technology, 201));
  },
  update: async (req, res, next) => {
    const updatedtechnology = req.body;
    const id = req.params.id;
    const technology = await technologyService.update(updatedtechnology, id);
    res.status(200).json(SuccessResponse(technology));
  },
  delete: async (req, res, next) => {
    const id = req.params.id;
    const istechnologyDelete = await technologyService.delete(id);

    res.status(204).json(
      new SuccessResponse(
        {
          message: "projet id:" + (id ? id : ""),
        },
        204
      )
    );
  },
};
module.exports = technologyController;
