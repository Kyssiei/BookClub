"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// ✅ Public Routes (Anyone Can Access)
router.get("/", bookController_1.getBooks); // Get all books (supports filtering by genre)
router.get("/:id", bookController_1.getBookById); // Get book by ID
// ✅ Protected Routes (Only Logged-in Users)
router.post("/", authMiddleware_1.protect, bookController_1.addBook); // Add a new book
router.put("/:id", authMiddleware_1.protect, bookController_1.updateBook); // Update book details
router.post("/:id/rate", authMiddleware_1.protect, bookController_1.rateBook); // Add a rating to a book
// ✅ Admin Routes (Only Admins Can Delete)
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, bookController_1.deleteBook);
exports.default = router;
