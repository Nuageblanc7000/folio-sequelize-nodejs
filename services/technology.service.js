const { TechnologyDTO, TechnologyCreateDTO } = require("../DTO/technology.dto");
const DBMYSQL = require("../models");
const db = require("../schemas");

const technologyService = {
  getAll: async () => {
    const { rows, count } = await DBMYSQL.Technology.findAndCountAll();
    return {
      technologies: rows.map((p) => new TechnologyDTO(p)),
      count,
    };
  },

  getById: async (id) => {
    const technology = await DBMYSQL.Technology.findByPk(id);
    return technology ? new TechnologyDTO(technology) : null;
  },
  create: async (newTechnology) => {
    const newTechnologyDTO = new TechnologyCreateDTO(newTechnology);
    const technology = await DBMYSQL.Technology.create(newTechnologyDTO);

    return technology ? new TechnologyDTO(technology) : null;
  },
  update: async (updatedProject, id) => {
    const technology = await DBMYSQL.Technology.update(
      { id: id },
      updatedProject
    );
    return technology ? new TechnologyDTO(technology) : null;
  },
  delete: async (id) => {
    const technology = await DBMYSQL.Technology.destroy({ where: { id: id } });

    return technology;
  },
};

module.exports = technologyService;
