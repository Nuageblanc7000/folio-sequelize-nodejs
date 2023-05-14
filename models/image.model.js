const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<{path:string}>}
 */
module.exports = (sequelize) => {
  const Image = sequelize.define("Image", {
    path: { type: DataTypes.STRING, allowNull: false },
  });
  return Image;
};
