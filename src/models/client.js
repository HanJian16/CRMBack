const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("client", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        len: [10, 35],
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 35],
      },
    },
    vip: {
      type: DataTypes.BOOLEAN,
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
