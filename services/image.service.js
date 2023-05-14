const DBMYSQL = require("../models");
const db = require("../models");

const imageService = {
  getAll: async () => {},

  getAllByProject: async (ProjectId) => {
    return await DBMYSQL.Image.findAll({ where: { ProjectId: ProjectId } });
  },

  getById: async (id) => {},
  create: async (newImage) => {
    const newImages = Array.isArray(newImage) ? newImage : [newImage];
    const images = await db.Image.bulkCreate(newImages);
    return images;
  },
  update: async (updateImage, id) => {},
  delete: async (checkImages) => {
    const deleteImages = await DBMYSQL.Image.destroy({
      where: { id: checkImages.map((image) => image.id) },
    });
    return deleteImages;
  },
};

module.exports = imageService;
