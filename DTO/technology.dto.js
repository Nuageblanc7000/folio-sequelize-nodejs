class TechnologyDTO {
  constructor({ id, title, icon }) {
    this.id = id;
    this.title = title;
    this.icon = icon;
  }
}

class TechnologyCreateDTO {
  constructor({ title, icon = null }) {
    this.title = title;
    this.icon = icon;
  }
}

module.exports = { TechnologyDTO, TechnologyCreateDTO };
