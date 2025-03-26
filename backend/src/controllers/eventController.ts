import { Request, Response } from "express";
import Event from "../models/event";
import { AuthRequest } from "../middleware/authMiddleware";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Create Event (Supports Virtual & Physical)
export const createEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, description, date, isVirtual, virtualLink, location } = req.body;

    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    // Ensure proper fields are set based on event type
    if (isVirtual && !virtualLink) {
        res.status(400);
        throw new Error("Virtual events must have a valid virtual link.");
    }
    if (!isVirtual && !location) {
        res.status(400);
        throw new Error("Physical events must have a location.");
    }

    const event = await Event.create({
        title,
        description,
        date,
        isVirtual,
        virtualLink: isVirtual ? virtualLink : null,
        location: isVirtual ? null : location,
        createdBy: req.user.id,
    });

    res.status(201).json(event);
});

//  RSVP to an Event (Fixed Auth Issue)
export const rsvpEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    const userId = new mongoose.Types.ObjectId(req.user.id)

    if (!event.attendees.includes(userId)) {
        event.attendees.push(userId);
        await event.save();
    }

    res.json({ message: "RSVP successful", event });
});

//  Delete an Event (Fixed Auth Issue)
export const deleteEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    if (event.createdBy.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not allowed to delete this event.");
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
});

//  Update an Event (Fixed Auth + Model Issues)
export const updateEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    if (event.createdBy.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not allowed to update this event.");
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    event.isVirtual = req.body.isVirtual !== undefined ? req.body.isVirtual : event.isVirtual;
    event.virtualLink = req.body.virtualLink || event.virtualLink;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
});

// Get All Events (Public)
export const getAllEvents = asyncHandler(async (_req: Request, res: Response) => {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
});

// Get Single Event (Public)
export const getEventById = asyncHandler(async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");

    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    res.json(event);
});
