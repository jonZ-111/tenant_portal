const express = require("express");
const router = express.Router();
const { Lease, Tenant } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/leases
router.get("/", async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch leases" });
  }
});

// GET /api/leases/my
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
    res.status(500).json({ error: "Failed to fetch lease" });
  }
});

//Tenant accepts lease
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
    await lease.save();

    res.json({ message: "Lease accepted successfully", lease });
  } catch (err) {
    console.error("Accept lease error:", err);
    res.status(500).json({ error: "Failed to accept lease" });
  }
});

module.exports = router;

