const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("licence", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    bossId: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.DATE,
    },
  });
};
