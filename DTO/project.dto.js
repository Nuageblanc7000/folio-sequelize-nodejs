const ImageDTO = require("./image.dto");
const { TechnologyDTO } = require("./technology.dto");
const { userDTO } = require("./user.dto");

class ProjectDTO {
  constructor({ id, title, description, User, Technologies, Images }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.user = new userDTO(User);
    this.images = Images.map((i) => new ImageDTO(i));
    this.technologies = Technologies.map((t) => new TechnologyDTO(t));
  }
}
class ProjectsDTO {
  constructor({ id, title, description, User, Technologies, Images }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.user = new userDTO(User);
    this.technologies = Technologies.map((t) => new TechnologyDTO(t));
    this.images = Images.map((i) => new ImageDTO(i));
    this.links = [
      {
        href: `/api/projects/${id}`,
        images: Images?.map((i) => "/projects/" + i.path),
      },
    ];
  }
}
class ProjectWithRelationDTO {
  constructor({ id, title, description, User, Technologies }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.user = new userDTO(User);

    this.technologies = Technologies.map((t) => new TechnologyDTO(t));
    this.links = [
      {
        href: `/api/projects/${id}`,
        // images: images.map((i) => "/projects/" + i.path),
      },
    ];
  }
}
class ProjectCreateDTO {
  constructor({ title, description, technologies }) {
    this.title = title;
    this.description = description;
    this.technologies = technologies;
  }
}

module.exports = {
  ProjectDTO,
  ProjectCreateDTO,
  ProjectWithRelationDTO,
  ProjectsDTO,
};
