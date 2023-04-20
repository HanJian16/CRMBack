const { Salesman, Boss } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createBoss = require("../Bosses/CreateBoss.js");
const getAllSalesman = require("../salesman/getAllSalesman.js");
const updateBoss = require("../Bosses/updateBoss.js");

const createToken = (user, role) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 7,
      ...user.dataValues,
      role,
    },
    "secret"
  );
  return { success: true, token };
};

const validate = async (value) => {
  const { pay_day = null, createdAt } = value;
  if (pay_day == null) {
    let endFree = new Date(createdAt);
    // console.log('Soy el createdAt', endFree);
    endFree.setDate(endFree.getDate() + 6);
    // console.log('Soy el endFree', endFree);
    const now = new Date();
    // console.log('Now', now);
    if (now > endFree) {
      await updateBoss({ ...value, enable: false });
    }
  } else {
    let fecha = new Date(pay_day);
    // console.log('fecha', fecha);
    const now = new Date();
    if (now > fecha) {
      await updateBoss({ ...value, enable: false });
    }
  }
};
module.exports = async (data) => {
  console.log(data);
  const { email, password, name, nickname } = data;

  let salesman = await Salesman.findOne({ where: { email: email } });
  if (salesman !== null) {
    if (password !== null) {
      if (bcrypt.compareSync(password, salesman.dataValues["password"]))
        if (salesman.dataValues.enable !== false) {
          console.log("ESTO ES SALESMAN EN FINDUSER LINEA 28", salesman);
          let id = salesman.dataValues.id;
          const vendedor = await getAllSalesman({ id });
          console.log("ESTO ES VENDEDOR LINEA 30 FINDUSER", vendedor);
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 7,
              ...vendedor,
            },
            "secret"
          );
          return { success: true, token };
        } else {
          throw new Error("user blocked");
        }
      else throw new Error("Salesman Password Incorrect");
    }
  }

  let boss = await Boss.findOne({ where: { email: email } });
  if (boss !== null) {
    if (password !== null) {
      if (bcrypt.compareSync(password, boss.dataValues["password"])) {
        await validate(boss.dataValues);
        return createToken(boss, "admin");
      } else throw new Error("Boss Password Incorrect");
    } else {
      await validate(boss.dataValues);
      return createToken(boss, "admin");
    }
  }

  let bossDos = await Boss.findOne({ where: { username: nickname } });
  if (bossDos !== null) {
    await validate(bossDos.dataValues);
    return createToken(bossDos, "admin");
  }

  if (nickname) {
    let boss = await createBoss({
      name,
      username: nickname,
      email,
      enable: true,
      pay_day: new Date(2023 - 04 - 19),
    });
    return createToken(boss, "admin");
  }

  throw new Error("User Not Exist");
};
