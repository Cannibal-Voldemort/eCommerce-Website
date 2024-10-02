const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const { tryCatchSimple } = require("../../utilities/errorhandling");
const router = express.Router();

router.post("/signup", tryCatchSimple(registerUser));
router.post("/login", tryCatchSimple(loginUser));
router.post('/logout', logOut)
router.get('/check-auth', authMiddleware, (req, res) =>{
  const user = user
  res.status(200).json({
    success: true,
    message: 'Authenticated user!',
    user,
  })
})

module.exports = router;
