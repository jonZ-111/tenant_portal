const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const db = require("../models");
const { Op } = require("sequelize");

const Tenant = db.Tenant;
const Lease = db.Lease;
const Payment = db.Payment;
const Ticket = db.MaintenanceTicket;

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const totalTenants = await Tenant.count();

    const activeLeases = await Lease.count({
      where: { status: "active" },
    });

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const paymentsThisMonth =
      (await Payment.sum("amount", {
        where: {
          createdAt: {
            [Op.gte]: startOfMonth,
          },
        },
      })) || 0;

    const openTickets = await Ticket.count({
      where: { status: "open" },
    });

    res.json({
      totalTenants,
      activeLeases,
      paymentsThisMonth,
      openTickets,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

