const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if ( !userName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    userName,
    email,
    password: hashPassword,
  });
  await newUser.save();
  res.status(200).json({
    success: true,
    message: "Signup successfull",
  });
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });
//   if (!user) {
//     res.json("UserName does not exit"); 
//   }
//   res.status(400).json({
//     sucess: true,
//     message: "Welcome back",
//   });
// };

module.exports = {
  registerUser,
};
