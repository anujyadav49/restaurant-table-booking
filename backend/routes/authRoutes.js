const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Create a token that is valid for 7 days
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// What we send back to the frontend after login/register
const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: createToken(user._id),
});

// POST /api/auth/register  -> create a new account
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // role is always "user" here, nobody can register as admin from the website
    const user = await User.create({ name, email, password });
    res.status(201).json(userResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login  -> log in with email + password
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json(userResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/auth/me  -> get the currently logged-in user
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
