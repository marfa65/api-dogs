const { DataTypes } = require("sequelize");
// const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "temperament",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
