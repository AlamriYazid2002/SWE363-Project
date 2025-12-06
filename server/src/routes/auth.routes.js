import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validation/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), async (req, res, next) => {
  const { name, kfupmId, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ email }, { kfupmId }] });
    if (existing) {
      return res.status(400).json({ error: "Email or KFUPM ID already registered" });
    }

    const user = new User({ name, kfupmId, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({ id: user.id, role: user.role, token });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/login", validate(loginSchema), async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const identifier = email?.toLowerCase ? email.toLowerCase().trim() : email?.trim();
    const user = await User.findOne({
      $or: [{ email: identifier }, { kfupmId: identifier }],
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email/ID or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email/ID or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ id: user.id, role: user.role, token });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
