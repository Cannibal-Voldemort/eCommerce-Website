const Address = require("../../models/address");
const { tryCatchSimple } = require("../../utilities/errorhandling");

const addAddress = async (req, res) => {
  const { userId, address, city, pincode, phone, notes } = req.body;

  if (!userId || !address || !city || !pincode || !phone || !notes) {
    return res.status(400).json({
      success: false,
      message: "Invalid data Provided",
    });
  }

  const newlyCreatedAddress = new Address({
    userId,
    address,
    city,
    pincode,
    notes,
    phone,
  });
  await newlyCreatedAddress.save();

  res.status(201).json({
    success: true,
    data: newlyCreatedAddress,
  });
};

const fetchAllAddress = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "UserId is required!",
    });
  }

  const addressList = await Address.find({ userId });
  res.status(200).json({
    success: true,
    data: addressList,
  });
};

const editAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const { formdata } = req.body;
  if (!userId || !addressId) {
    return res.status(400).json({
      success: false,
      message: "UserId and AddressId required!",
    });
  }
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    formdata,
    { new: true }
  );
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Adress not found",
    });
  }
  res.status(200).json({
    success: true,
    data: address,
  });
};

const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  if (!userId || !addressId) {
    return res.status(400).json({
      success: false,
      message: "UserId and AddressId required!",
    });
  }
  const address = await Address.findOneAndDelete({ _id: addressId, userId });
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Adress not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Adress is deleted successfully",
  });
};

module.exports = {
  addAddress: tryCatchSimple(addAddress),
  fetchAllAddress: tryCatchSimple(fetchAllAddress),
  editAddress: tryCatchSimple(editAddress),
  deleteAddress: tryCatchSimple(deleteAddress),
};
