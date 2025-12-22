const express = require("express");
const router = express.Router();
const { Lease, Tenant } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/leases (ADMIN)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const leases = await Lease.findAll({
      include: {
        model: Tenant,
        as: "tenant",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    });

    res.json(leases);
  } catch (err) {
    console.error("Fetch leases error:", err);
    res.status(500).json({ message: "Failed to fetch leases" });
  }
});

// POST /api/leases (ADMIN)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      tenantId,
      unitNumber,
      startDate,
      endDate,
      rentAmount,
      depositAmount,
      rentDueDay,
    } = req.body;

    const lease = await Lease.create({
      tenantId,
      unit: unitNumber, // DB column is `unit`
      startDate,
      endDate,
      rentAmount,
      depositAmount,
      rentDueDay,
      status: "pending",
      isActive: false,
    });

    res.status(201).json(lease);
  } catch (err) {
    console.error("Create lease error:", err);
    res.status(500).json({ message: "Failed to create lease" });
  }
});

// GET /api/leases/my (TENANT)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      where: { userId: req.user.id },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant record not found" });
    }

    const lease = await Lease.findOne({
      where: { tenantId: tenant.id },
    });

    if (!lease) {
      return res.status(404).json({ message: "No lease assigned yet" });
    }

    res.json(lease);
  } catch (err) {
    console.error("Fetch tenant lease error:", err);
    res.status(500).json({ message: "Failed to fetch lease" });
  }
});

// PUT /api/leases/my/accept
router.put("/my/accept", authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      where: { userId: req.user.id },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const lease = await Lease.findOne({
      where: { tenantId: tenant.id },
    });

    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }

    if (lease.status !== "pending") {
      return res.status(400).json({ message: "Lease already accepted" });
    }

    lease.status = "active";
    lease.isActive = true;
    await lease.save();

    res.json({ message: "Lease accepted successfully", lease });
  } catch (err) {
    console.error("Accept lease error:", err);
    res.status(500).json({ message: "Failed to accept lease" });
  }
});

module.exports = router;


