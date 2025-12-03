import express from "express";
import { body, param, query, validationResult } from "express-validator";
import { auth } from "../middleware/auth.js";
import { Event } from "../models/Event.js";

const router = express.Router();
const statusOptions = ["pending", "approved", "rejected"];

const validateEventCreate = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
  body("startAt").isISO8601().withMessage("startAt must be a valid date"),
  body("endAt").isISO8601().withMessage("endAt must be a valid date"),
  body("venue").trim().notEmpty().withMessage("Venue is required"),
  body("description").optional().isString(),
];

const validateEventUpdate = [
  body("title").optional().trim().notEmpty(),
  body("category").optional().trim().notEmpty(),
  body("capacity").optional().isInt({ min: 1 }),
  body("startAt").optional().isISO8601(),
  body("endAt").optional().isISO8601(),
  body("venue").optional().trim().notEmpty(),
  body("description").optional().isString(),
];

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return null;
};

router.post("/", auth(["admin", "organizer"]), validateEventCreate, async (req, res, next) => {
  const errorResponse = handleValidation(req, res);
  if (errorResponse) return errorResponse;

  const { title, category, capacity, startAt, endAt, venue, description } = req.body;

  try {
    const event = await Event.create({
      title,
      category,
      capacity,
      startAt,
      endAt,
      venue,
      description,
      organizerId: req.user.id,
    });

    return res.status(201).json(event);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get(
  "/",
  auth(["admin", "organizer", "student"]),
  [
    query("status").optional().isIn(statusOptions),
    query("category").optional().isString(),
  ],
  async (req, res, next) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    try {
      const events = await Event.find(filter);
      return res.json(events);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

router.get(
  "/:id",
  auth(["admin", "organizer", "student"]),
  [param("id").isMongoId().withMessage("Invalid event id")],
  async (req, res, next) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      return res.json(event);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

router.patch(
  "/:id",
  auth(["admin", "organizer"]),
  [param("id").isMongoId().withMessage("Invalid event id"), ...validateEventUpdate],
  async (req, res, next) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });

      if (req.user.role !== "admin" && event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updates = (({
        title,
        category,
        capacity,
        startAt,
        endAt,
        venue,
        description,
      }) => ({ title, category, capacity, startAt, endAt, venue, description }))(req.body);

      Object.entries(updates).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          event[key] = value;
        }
      });

      await event.save();
      return res.json(event);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

router.patch(
  "/:id/status",
  auth(["admin"]),
  [param("id").isMongoId().withMessage("Invalid event id"), body("status").isIn(statusOptions)],
  async (req, res, next) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });

      event.status = req.body.status;
      await event.save();
      return res.json(event);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

router.delete(
  "/:id",
  auth(["admin", "organizer"]),
  [param("id").isMongoId().withMessage("Invalid event id")],
  async (req, res, next) => {
    const errorResponse = handleValidation(req, res);
    if (errorResponse) return errorResponse;

    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });

      if (req.user.role !== "admin" && event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
      }

      await event.deleteOne();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

export default router;
