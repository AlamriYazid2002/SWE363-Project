import express from "express";
import auth from "../middleware/auth.js";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/events.controller.js";
import { validate } from "../middleware/validate.js";
import { createEventSchema, updateEventSchema } from "../validation/event.validation.js";

const router = express.Router();

router.post("/", auth(["organizer", "admin"]), validate(createEventSchema), createEvent);
router.get("/", auth(), getEvents);
router.get("/:id", auth(), getEventById);
router.patch("/:id", auth(["organizer", "admin"]), validate(updateEventSchema), updateEvent);
router.delete("/:id", auth(["organizer", "admin"]), deleteEvent);

export default router;
