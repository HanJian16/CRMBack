const { Salesman } = require("../../db.js");
const getAllSalesman = require("./getAllSalesman.js");
const fs = require("fs");
const uploadFile = require("../../firebase.js");
const bcrypt = require("bcrypt");

module.exports = async (data, path) => {
  console.log("ESTO ES UPDATE-SALESMAN", data);
  const { password } = data;
  
  if (path) {
    const img = fs.readFileSync(path).buffer;
    const image = await uploadFile(img, "salesman");
    const dataAct = { ...data, image };
    var id = dataAct.id;
    delete dataAct.id;
    dataAct.password= bcrypt.hashSync(password, 10)
    var [resultado] = await Salesman.update(dataAct, {
      where: {
        id,
      },
    });
  } else {
    const dataAct = { ...data };
    var id = dataAct.id;
    delete dataAct.id;
    dataAct.password= bcrypt.hashSync(password, 10)
    var [resultado] = await Salesman.update(dataAct, {
      where: {
        id,
      },
    });
  }

  if (resultado) {
    return await getAllSalesman({ id });
  } else throw new Error("Failed to update, missing information");
};
