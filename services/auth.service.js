const { userCreateDTO, userDTO } = require("../DTO/user.dto");
const DBMYSQL = require("../models");

const bcrypt = require("bcrypt");

const authService = {
  register: async (newUser) => {
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const userCreate = new userCreateDTO(newUser);
    const user = await DBMYSQL.User.create(userCreate);

    return new userDTO(user);
  },
  login: async (email, password) => {
    const user = await DBMYSQL.User.findOne({ where: { email: email } });
    const isPasswordVerify = await bcrypt.compare(password, user.password);
    return isPasswordVerify ? new userDTO(user) : null;
  },

  //mise à jour v2 opti du user avec un getUser pour trouver le user co directement
  getUser: async (userID, model) => {},
};

module.exports = authService;
