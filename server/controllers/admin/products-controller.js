const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");
const { tryCatchSimple } = require("../../utilities/errorhandling");

const handleImageUpload = async (req, res) => {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const url = "data:" + req.file.mimetype + ";base64," + b64;
  const result = await imageUploadUtil(url);

  res.json({
    success: true,
    result,
  });
};

// adding Product

const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  const newlyCreatedProduct = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  });
  await newlyCreatedProduct.save();
  res.status(201).json({
    success: true,
    data: newlyCreatedProduct,
  });
};

// Fetching Products

const fetchAllProducts = async (req, res) => {
  const listOfProducts = await Product.find({});
  res.status(200).json({
    success: true,
    data: listOfProducts,
  });
};

// editing Product

const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  const findProduct = await Product.findById(id);
  if (!findProduct) return
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  findProduct.title = title || findProduct.title;
  findProduct.description = description || findProduct.description;
  findProduct.category = category || findProduct.category;
  findProduct.brand = brand || findProduct.brand;
  findProduct.price = price || findProduct.price;
  findProduct.salePrice = salePrice || findProduct.salePrice;
  findProduct.totalStock = totalStock || findProduct.totalStock;
  findProduct.image = image || findProduct.image
  await findProduct.save()
  res.status(200).json({
    success: true,
    data: findProduct,
  })
};

//removing Product

const deleteProduct = async(req, res) =>{
  const {id} = req.params
  const product = await Product.findByIdAndDelete(id)

  if(!product) return res.status(404).json({
    success: false,
    message: 'Product not found'
  })
  res.status(200).json({
    success: true,
    message: 'Product deleted Successfully'
  })
}

module.exports = {
  handleImageUpload: tryCatchSimple(handleImageUpload),
  addProduct: tryCatchSimple(addProduct),
  fetchAllProducts: tryCatchSimple(fetchAllProducts),
  editProduct: tryCatchSimple(editProduct),
  deleteProduct: tryCatchSimple(deleteProduct)
};
