const Product = require("../../models/product");

const getFilteredProducts = async (req, res) => {
  

  const products = await Product.find({});

  console.log(products);

  res.status(200).json({
    success: true,
    data: products,
  });
};

module.exports = { getFilteredProducts };
