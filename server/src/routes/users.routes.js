import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", auth(), (req, res) => {
  return res.json({ id: req.user.id, role: req.user.role });
});

router.get("/", auth(["admin"]), async (_req, res, next) => {
  try {
    const users = await User.find({}, "name email role");
    return res.json(users);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
