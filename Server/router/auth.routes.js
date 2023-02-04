const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/register", authController.userRegister);

router.post("/login", authController.userLogin);

router.post("/reset-password", authController.resetUserPassword);

router.post("/forgot-password", authController.forgotPassword);

router.post("/verify-email", authController.userVerify);

router.post(
  "/resend-verification-email",
  authController.userResendVerification
);

router.post("/change-password", authMiddleware, authController.changePassword);

module.exports = router;
