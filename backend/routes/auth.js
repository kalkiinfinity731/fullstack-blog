import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, generateToken } from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const user = createUser(username, email, password);
    const token = generateToken(user.id);

    res.json({ message: "User registered successfully", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
