const { Product } = require("../../db.js");

module.exports = async (id) => {
  console.log("ESTO ES GETPRODUCTSBYID", id);
  if (!id) throw new Error("(id) Product required");

  if (id) {
    const product = await Product.findByPk(id);
    return product;
  }
};
