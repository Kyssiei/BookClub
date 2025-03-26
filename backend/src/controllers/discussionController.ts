import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Discussion from "../models/discussion";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";

// Public: Get all discussions
export const getAllDiscussions = asyncHandler(async (_req: Request, res: Response) => {
    const discussions = await Discussion.find().populate("createdBy", "name email");
    res.json(discussions);
});

// Public: Get a single discussion with comments
export const getDiscussionById = asyncHandler(async (req: Request, res: Response) => {
    const discussion = await Discussion.findById(req.params.id)
        .populate("createdBy", "name email")
        .populate("comments.user", "name email");

    if (!discussion) {
        res.status(404);
        throw new Error("Discussion not found");
    }

    res.json(discussion);
});

// Protected: Create a new discussion
export const createDiscussion = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, content } = req.body;

    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const discussion = await Discussion.create({
        title,
        content,
        createdBy: req.user.id,
    });

    res.status(201).json(discussion);
});

// Protected: Add a comment to a discussion
export const addComment = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { comment } = req.body;

    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }

    // Validate if req.user.id is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
        res.status(400);
        throw new Error("Invalid user ID format");
    }

    // Ensure userId is treated as ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
        res.status(404);
        throw new Error("Discussion not found");
    }


    discussion.comments.push({ user: userId, comment, createdAt: new Date()});
    await discussion.save();

    res.json(discussion);
});
