const capitalize = require("../utils/string/capitalize");
const ProjectNotUserDTO = require("./projectNotUser.dto");

class userDTO {
  constructor({ id, firstname, lastname, email, role }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    // this.fullName = capitalize(fullName);
    this.email = email;
    this.role = role;
  }
}

class userCreateDTO {
  constructor({ firstname, lastname, full_name, email, password, avatar }) {
    this.firstname = firstname;

    (this.lastname = lastname), (this.email = email);
    this.fullName = full_name;
    this.password = password;
    this.avatar = avatar;
  }
}
module.exports = { userDTO, userCreateDTO };
