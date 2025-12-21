const db = require("./models");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/users");
const tenantRoutes = require("./routes/tenants");
const leaseRoutes = require("./routes/leases");

app.use('/auth', authRoutes);
app.use("/dashboard", require("./routes/dashboard"));
app.use("/api/users", userRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/leases", leaseRoutes);
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/maintenance-tickets", require("./routes/maintenanceTickets"));



app.get("/", (req, res) => {
    res.json({ message: "Server is Up"});
});

const PORT = process.env.PORT || 3001;

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB sync error:", err);
  });