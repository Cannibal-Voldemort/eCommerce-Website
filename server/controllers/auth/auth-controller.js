const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const {tryCatchWithNext} = require("../../utilities/errorhandling")

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser)
    return res.json({
      success: false,
      message: "User Already exists try to login instead",
    });
  // if ( !userName || !email || !password) {
  //   return res.status(400).json({ error: "All fields are required" });
  // }
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (!checkUser)
    return res.json({
      success: false,
      message: "Username doesn't exists! Please Signup instead.",
    });
  const CheckPasswordMatch = await bcrypt.compare(password, checkUser.password);
  if (!CheckPasswordMatch)
    return res.json({
      success: false,
      message: "Invalid password! Please try again",
    });

  const token = jwt.sign(
    {
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
    },
    "aman_key",
    { expiresIn: "60m" }
  );

  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Logged in successfully",
    user: {
      email: checkUser.email,
      role: checkUser.role,
      id: checkUser._id,
    },
  });
};

const logOut = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

const authMiddleware = tryCatchWithNext(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorisd User",
    });
  }
  const decoded = jwt.verify(token, amam_key);
  req.user = decoded;
  next();
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  authMiddleware
};
