import express from "express";
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    rsvpEvent,
} from "../controllers/eventController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected Routes
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.post("/:id/rsvp", protect, rsvpEvent);

export default router;
