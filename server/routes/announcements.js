const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const db = require("../models");
const Announcement = db.Announcement;


 // ADMIN — Create announcement

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, message } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      createdBy: req.user.id,
    });

    res.status(201).json(announcement);
  } catch (err) {
    console.error("Create announcement error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//ADMIN + TENANT — View announcements

router.get("/", authMiddleware, async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(announcements);
  } catch (err) {
    console.error("Fetch announcements error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
