const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const Technology = sequelize.define("Technology", {
    title: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING },
  });

  return Technology;
};
