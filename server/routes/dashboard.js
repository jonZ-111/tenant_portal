const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// TEMP VALUES — later connect to DB queries
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    return res.json({
      totalTenants: 32,
      activeLeases: 29,
      paymentsThisMonth: 14500,
      openTickets: 7,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
