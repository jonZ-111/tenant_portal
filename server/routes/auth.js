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
            role: req.user.role
        }
    });
});

//middleware route test
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

module.exports= router;