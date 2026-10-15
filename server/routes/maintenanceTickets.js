const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { MaintenanceTicket, Tenant } = require("../models");
const requireRole = require("../middleware/requireRole");


 //Tenant creates a message / maintenance ticket

router.post("/", authMiddleware, requireRole("tenant"), async (req, res) => {
  try {
    // 1. read the data the tenant's form sent
    const {category, priority, description} = req.body;
    // 2. Validate BEFORE touching database
    if (!description || !description.trim()) {
      return res.status(400).json({ message: "Description is required" });
    }
    // 3. Find the tenant associated with the logged-in user
    const tenant = await Tenant.findOne({
      where: { userId: req.user.id },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    // 4. Create the maintenace ticket with the tenant's values
    const ticket = await MaintenanceTicket.create({
      tenantId: tenant.id,
      category,
      priority,
      description: description.trim(),
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// GET /api/maintenance-tickets/my (TENANT)
router.get("/my", authMiddleware, requireRole("tenant"), async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ where: { userId: req.user.id } });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const tickets = await MaintenanceTicket.findAll({
      where: { tenantId: tenant.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(tickets);
  } catch (err) {
    console.error("Fetch my tickets error:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// GET /api/maintenance-tickets (ADMIN)
router.get("/", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const tickets = await MaintenanceTicket.findAll({
      include: {
        model: Tenant,
        as: "tenant",
        attributes: ["id", "firstName", "lastName", "unitNumber"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(tickets);
  } catch (err) {
    console.error("Fetch all tickets error:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// PATCH /api/maintenance-tickets/:id/status (ADMIN)
router.patch("/:id/status", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["open", "in-progress", "closed"];

    // 1. Validate the value BEFORE touching the database
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // 2. Find the ticket by the id in the URL
    const ticket = await MaintenanceTicket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // 3. Update and save
    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error("Update ticket status error:", err);
    res.status(500).json({ message: "Failed to update ticket" });
  }
});

module.exports = router;
