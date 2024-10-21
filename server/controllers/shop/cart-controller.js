const Cart = require("../../models/cart");
const Product = require("../../models/product");
const { tryCatchSimple } = require("../../utilities/errorhandling");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid Data Provided!",
    });
  }
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  // when we add identical product
  const findCurrentProductIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  ); // productId is stored as String so we are converting it into string
  if (findCurrentProductIndex === -1) {
    // when we dont get index findindex return -1
    cart.items.push({ productId, quantity });
  } else {
    cart.items[findCurrentProductIndex].quantity += quantity;
  }
  await cart.save();
  res.status(200).json({
    success: true,
    data: cart,
  });
};

const fetchCartItems = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User id is madatory",
    });
  }
  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image title price salePrice ",
  });
  if (!cart) {
    return res.status(404)({
      success: false,
      message: "Cart not found",
    });
  }
  // valid item is here bcz when i add item to cart then from the admin side the product is deleted then productId will no be availaible so
  const validItems = cart.items.filter((productItem) => productItem.productId);

  if (validItems.length < cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }
  // based on valid item we populate it
  const populateCartItems = validItems.map((item) => ({
    productId: item.productId._id,
    image: item.productId.image,
    title: item.productId.title,
    price: item.productId.price,
    salePrice: item.productId.salePrice,
    quantity: item.quantity,
  }));
  return res.status(200).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
};

const updateCartItemQty = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || quantity <= 0) {
    return res.status(400)({
      success: false,
      message: "Invalid Data Provided!",
    });
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404)({
      success: false,
      message: "Cart not found",
    });
  }
  const findCurrentProductIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (findCurrentProductIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item is not present",
    });
  }
  cart.items[findCurrentProductIndex].quantity = quantity;
  await cart.save();
  await cart.populate({
    path: "items.productId",
    select: "image title price salePrice",
  });
  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    title: item.productId ? item.productId.title : null,
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));
  return res.status(200).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
};

const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  if (!userId || !productId) {
    return res.status(400)({
      success: false,
      message: "Invalid Data Provided!",
    });
  }
  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image title price salePrice ",
  });
  if (!cart) {
    return res.status(404)({
      success: false,
      message: "Cart not found",
    });
  }
  cart.items = cart.items.filter(
    (item) => item.productId._id.toString() !== productId
  );
  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "image title price salePrice ",
  });
  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    title: item.productId ? item.productId.title : null,
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));
  return res.status(200).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
};

module.exports = {
  addToCart: tryCatchSimple(addToCart),
  updateCartItemQty: tryCatchSimple(updateCartItemQty),
  deleteCartItem: tryCatchSimple(deleteCartItem),
  fetchCartItem: tryCatchSimple(fetchCartItems),
};
