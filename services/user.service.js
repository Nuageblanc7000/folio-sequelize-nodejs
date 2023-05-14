const { userDTO } = require("../DTO/user.dto");
const DBMYSQL = require("../models");
const userService = {
  getAll: async (limit, offset, paranoid = false) => {
    const { rows, count } = await DBMYSQL.User.findAndCountAll({ paranoid });
    return {
      users: rows.map((u) => new userDTO(u)),
      count,
    };
  },
  getById: async (id) => {
    const user = await DBMYSQL.User.findByPk(id);

    return user ? new userDTO(user) : null;
  },
  update: async (id, updatedUser) => {
    const user = await DBMYSQL.User.update({ _id: id }, updatedUser);
    return user ? new userDTO(user) : null;
  },

  softDelete: async (userId) => {
    const deleteSoft = await DBMYSQL.User.destroy({ where: { id: userId } });
    return deleteSoft === 1;
  },

  restore: async (userId) => {
    const restoreUser = await DBMYSQL.User.restore({ where: { id: userId } });
    return restoreUser === 1;
  },

  userEmailExist: async (email) => {
    const user = await DBMYSQL.User.findOne({
      where: { email: email },
    });
    return !!user;
  },
};
module.exports = userService;
