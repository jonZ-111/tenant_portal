const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleWare = require("../middleware/authMiddleware");

//POST/login
router.post('/login', authController.login);

//middleware route test
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

module.exports= router;