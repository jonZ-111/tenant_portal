const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");

//POST/login
router.post('/login', authController.login);

//Validate Auth Route
router.get("/validate", authMiddleware, (req, res) => {
  return res.json({
    authenticated: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      mustChangePassword: req.user.mustChangePassword
    }
  });
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({
    id: req.user.id,
    name: req.user.firstName || req.user.email,
    email: req.user.email,
    role: req.user.role
  });
});

//middleware route test
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

// Change password (tenant or any authenticated user)
router.put(
  "/change-password",
  authMiddleware,
  authController.changePassword
);

// Logout
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    })
    .json({ message: "Logged out successfully" });
});

module.exports= router;