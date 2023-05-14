const {
  ProjectDTO,
  ProjectCreateDTO,
  ProjectsDTO,
} = require("../DTO/project.dto");
const DBMYSQL = require("../models");
const db = require("../schemas");
const fs = require("fs");
const path = require("path");
const imageService = require("./image.service");
const fileService = require("./file.service");

const projectService = {
  getAll: async () => {
    const projects = await DBMYSQL.Project.findAll({
      include: [DBMYSQL.User, DBMYSQL.Technology, DBMYSQL.Image],
    });
    return {
      projects: projects.map((p) => new ProjectsDTO(p)),
      count: projects.length,
    };
  },

  getById: async (id) => {
    const project = await DBMYSQL.Project.findOne({
      include: [DBMYSQL.User, DBMYSQL.Technology, DBMYSQL.Image],
      where: { id: id },
    });
    return project ? new ProjectDTO(project) : null;
  },

  create: async (newProject, user) => {
    //gérer le user faudra rajouter le jwt
    const newProjectDTO = new ProjectCreateDTO(newProject);
    newProjectDTO.UserId = user;
    const project = await DBMYSQL.Project.create(newProjectDTO);
    if (newProject.images?.length) {
      await project.addImages(newProject.images);
    }
    if (newProjectDTO.technologies?.length > 0) {
      const technos = await DBMYSQL.Technology.findAll({
        where: { id: newProjectDTO.technologies },
      });
      await project.addTechnologies(technos);
    }
    return project ? new ProjectCreateDTO(project) : null;
  },

  update: async (updatedProject, id) => {
    const { imagesRemove, images = [] } = updatedProject;

    const parseImagesRemoveInt = Array.isArray(imagesRemove)
      ? imagesRemove.map((i) => parseInt(i))
      : [+imagesRemove];
    await DBMYSQL.Project.update(updatedProject, { where: { id } });
    const project = await DBMYSQL.Project.findByPk(id);
    if (imagesRemove?.length) {
      const dbImageProject = await imageService.getAllByProject(project.id);
      const checkImages = dbImageProject.filter((i) =>
        parseImagesRemoveInt.includes(i.id)
      );
      if (checkImages.length) {
        await project.removeImages(checkImages);
        await imageService.delete(checkImages);
        fileService.deleteFile(
          checkImages.map(
            (f) =>
              (f = {
                path: `${fileService.sourceFileImageProject}${f.path}`,
              })
          ),
          (err) => {
            console.log(err);
          }
        );
      }
    }
    if (images?.length) {
      await project.addImages(images);
    }
    const projectUpdate = await DBMYSQL.Project.findByPk(id, {
      include: [DBMYSQL.User, DBMYSQL.Image, DBMYSQL.Technology],
    });
    return projectUpdate ? new ProjectDTO(projectUpdate) : null;
  },

  softDelete: async (id) => {
    const deleteProject = await DBMYSQL.Project.destroy({ where: { id: id } });
    return deleteProject === 1;
  },
  // delete: async (id) => {},
};
module.exports = projectService;
