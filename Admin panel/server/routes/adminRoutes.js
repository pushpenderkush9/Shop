const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/admin");

dotenv.config(); // Ensure environment variables are loaded

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password and log it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password at Registration:", hashedPassword);

    // Create new admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Debugging logs
    console.log("Plain Password Entered:", password);
    console.log("Stored Hashed Password in DB:", adminUser.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, adminUser.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, adminID: adminUser._id, name: adminUser.name });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protect Route Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};


router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "dashboard Access Granted", admin: req.admin });
});
router.get("/add", authMiddleware, (req, res) => {
  res.json({ message: "add Access Granted", admin: req.admin });
});
router.get("/stock", authMiddleware, (req, res) => {
  res.json({ message: "stock Access Granted", admin: req.admin });
});

module.exports = router;
