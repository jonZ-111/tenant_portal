const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { MaintenanceTicket, Tenant } = require("../models");


 //Tenant creates a message / maintenance ticket

router.post("/", authMiddleware, async (req, res) => {
  try {
    // Find tenant linked to logged-in user
    const tenant = await Tenant.findOne({
      where: { userId: req.user.id },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const ticket = await MaintenanceTicket.create({
      tenantId: tenant.id,
      category: "general",
      description: req.body.description,
      priority: "medium",
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

module.exports = router;
