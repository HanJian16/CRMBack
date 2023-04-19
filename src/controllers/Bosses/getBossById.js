const { Boss } = require("../../db.js");

module.exports = async (id) => {
  if (!id) throw new Error("(id) Boss required");
  console.log("ESTO ES GETBOSS", id);
  if (id) {
    const boss = await Boss.findByPk(id);
    return {
      ...boss.dataValues,
      role: "admin",
    };
  }
};
