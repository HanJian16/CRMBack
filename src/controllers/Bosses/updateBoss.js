const { Boss } = require("../../db.js");
const getBossById = require("./getBossById.js");
const fs = require("fs");
const uploadFile = require("../../firebase.js");
const bcrypt = require("bcrypt");

const updateBoss = async (data, path) => {
  console.log("ESTO ES UPDATE-BOSS", data);
  if (path) {
    const img = fs.readFileSync(path).buffer;
    const logo = await uploadFile(img, "boss");
    const dataAct = { ...data, logo };
    var id = dataAct.id;
    delete dataAct.id;
    console.log("llegó aqui linea 15");
    if (data["password"]) {
      dataAct.password = bcrypt.hashSync(password, 10);
    }
    console.log("llegó aqui linea 19");
    var resultado = await Boss.update(dataAct, {
      where: {
        id,
      },
    });
  } else {
    const dataAct = { ...data };
    var id = dataAct.id;
    delete dataAct.id;
    console.log("llegó aqui linea 29");
    if (data["password"]) {
      dataAct.password = bcrypt.hashSync(password, 10);
    }
    console.log("llegó aqui linea 33");
    var resultado = await Boss.update(dataAct, {
      where: {
        id,
      },
    });
  }
  console.log(resultado);
  if (resultado) {
    const boss = await getBossById(id);
    return {
      ...boss,
      role: "admin",
    };
  } else throw new Error("Failed to update, missing information");
};

module.exports = updateBoss;
