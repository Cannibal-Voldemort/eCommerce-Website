const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const { tryCatchSimple, tryCatchWithNext } = require("../../utilities/errorhandling");
const router = express.Router();

router.post("/signup", tryCatchSimple(registerUser));
router.post("/login", tryCatchSimple(loginUser));
router.post("/logout", logOutUser);
router.get("/check-auth",tryCatchWithNext(authMiddleware), (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
