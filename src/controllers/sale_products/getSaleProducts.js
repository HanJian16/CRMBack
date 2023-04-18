const { Sale_product, Product } = require("../../db.js");

module.exports = async ({ id, activityId }) => {
  console.log(id + " y " + activityId);
  if (!id && !activityId)
    throw new Error("(id) sale_product or activityId required");

  if (activityId) {
    const allSaleProducts = await Sale_product.findAll({
      where: {
        activityId,
      },
      include: [
        {
          model: Product,
        }
      ]
    },
    );
    return allSaleProducts;
  }

  if (id) {
    const sale_product = await Sale_product.findByPk(id,
      {
        include: [
          {
            model: Product,
          }
        ]
      }
    );
    return sale_product;
  }
};
