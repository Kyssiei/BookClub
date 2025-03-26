import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  addComment
} from "../controllers/discussionController";

const router = express.Router();

// 📌 Public Routes
router.get("/", getAllDiscussions); // Get all discussions
router.get("/:id", getDiscussionById); // Get a single discussion with comments

// 🔒 Protected Routes (Users Only)
router.post("/", protect, createDiscussion); // Create a discussion
router.post("/:id/comments", protect, addComment); // Add a comment to a discussion

export default router;
