const { Boss } = require("../../db.js");
const { sendMail } = require("../email/email.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const uploadFile = require("../../firebase.js");

const createBoss = async (data, path) => {
  console.log("ESTO ES CREATEBOOS", data);
  if (data.password === null || !data.password) data["password"] = "12345";
  if (path) {
    const img = fs.readFileSync(path).buffer;
    const logo = await uploadFile(img, "boss");
    var newBoss = await Boss.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
      logo,
    });
  } else {
    console.log("Esto es data antes de entra a db", data);
    var newBoss = await Boss.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    });
  }
  sendMail(newBoss);
  return {
    ...newBoss.dataValues,
    role: "admin",
  };
};

module.exports = createBoss;
