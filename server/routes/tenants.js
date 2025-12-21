const express = require("express");
const router = express.Router();
const { Tenant, User } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");
const { createProfile } = require("../controllers/userController");

// GET /api/tenants
router.get("/", function (req, res) {
  console.log("GET /api/tenants HIT");

  Tenant.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: [
        "mustChangePassword",
        "passwordChangedAt"
        ]
      }
    ]
  })
    .then((tenants) => {
      res.json(tenants);
    })
    .catch((err) => {
      console.error(" Fetch tenants error:", err);
      res.status(500).json({ error: "Failed to fetch tenants" });
    });
});

// POST /api/tenants
router.post("/", authMiddleware, async (req, res) => {
  // Force tenant creation through the proven profile flow
  req.body.role = "tenant";
  req.body.profile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    unitNumber: req.body.unitNumber,
  };

  return createProfile(req, res);
});


// DELETE /api/tenants/:id
router.delete("/:id", async (req, res) => {
  try {
    const tenant = await Tenant.findByPk(req.params.id);

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    const userId = tenant.userId;
    //Delete Tenant First
    await tenant.destroy();
    //Delete associated user next
    const { User } = require("../models");
    await User.destroy({ where: { id: userId } });

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete tenant error:", err);
    res.status(500).json({ error: "Failed to delete tenant" });
  }
});


module.exports = router;
