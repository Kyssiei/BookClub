import express from "express";
import { getBooks, getBookById, addBook, updateBook, deleteBook, rateBook } from "../controllers/bookController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes (Anyone Can Access)
router.get("/", getBooks); // Get all books (supports filtering by genre)
router.get("/:id", getBookById); // Get book by ID

// Protected Routes (Only Logged-in Users)
router.post("/", protect, addBook); // Add a new book
router.put("/:id", protect, updateBook); // Update book details
router.post("/:id/rate", protect, rateBook); // Add a rating to a book

// Admin Routes (Only Admins Can Delete)
router.delete("/:id", protect, adminOnly, deleteBook); 

export default router;
