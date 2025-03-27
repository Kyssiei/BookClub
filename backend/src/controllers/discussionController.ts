import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Discussion from "../models/discussion";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";

// ✅ Get all discussions
export const getAllDiscussions = asyncHandler(async (_req: Request, res: Response) => {
    const discussions = await Discussion.find()
        .populate("createdBy", "name email")
        .populate("bookId", "title author")
        .populate("comments.user", "name email");

    res.json(discussions);
});

// ✅ Get a single discussion with comments
export const getDiscussionById = asyncHandler(async (req: Request, res: Response) => {
    const discussion = await Discussion.findById(req.params.id)
        .populate("createdBy", "name email")
        .populate("bookId", "title author")
        .populate("comments.user", "name email");

    if (!discussion) {
        res.status(404);
        throw new Error("Discussion not found");
    }

    res.json(discussion);
});

// ✅ Create a discussion with `bookId`
export const createDiscussion = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { topic, content, bookId } = req.body;

    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    if (!bookId) {
        res.status(400);
        throw new Error("Book ID is required to create a discussion");
    }

    const discussion = await Discussion.create({
        topic,
        content,
        bookId,
        createdBy: req.user.id,
    });

    res.status(201).json(discussion);
});

// ✅ Add a comment to a discussion
export const addComment = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { comment } = req.body;

    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
        res.status(404);
        throw new Error("Discussion not found");
    }

    discussion.comments.push({
        user: new mongoose.Types.ObjectId(req.user.id),
        comment,
        createdAt: new Date()
    });

    await discussion.save();
    res.json(discussion);
});

// ✅ Update a discussion
export const updateDiscussion = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { topic, content } = req.body;

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
        res.status(404);
        throw new Error("Discussion not found");
    }

    if (topic) discussion.topic = topic;
    if (content) discussion.content = content;

    await discussion.save();
    res.json(discussion);
});
