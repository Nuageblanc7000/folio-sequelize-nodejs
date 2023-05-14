const TechnologyDTO = require("./technology.dto");

class ProjectNotUserDTO {
  constructor({ _id, title, description, images, technologies }) {
    this.title = title;
    this.id = _id;
    this.images = images;
    this.description = description;
    this.technologies = technologies.map((t) => new TechnologyDTO(t));
  }
}

module.exports = ProjectNotUserDTO;
