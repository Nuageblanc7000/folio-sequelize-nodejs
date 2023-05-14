// firstname: { type: String, required: true },
// lastname: { type: String, required: true },
// email: {
const { Sequelize, DataTypes, ModelStatic } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: "user" },
    },
    { paranoid: true }
  );
  return User;
};
