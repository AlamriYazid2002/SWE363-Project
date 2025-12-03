import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/events.routes.js";
import userRoutes from "./routes/users.routes.js";

import auth from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Check current user
app.get("/api/me", auth(), (req, res) => res.json(req.user));

// Events + users
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// Health
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

// Error handler
app.use((err, _req, res, _next) =>
  res.status(err.status || 500).json({ error: err.message || "Server error" })
);

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`🚀 :${port}`)));
