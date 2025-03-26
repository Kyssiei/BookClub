"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateBook = exports.deleteBook = exports.updateBook = exports.addBook = exports.getBookById = exports.getBooks = void 0;
const books_1 = __importDefault(require("../models/books"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// ✅ Get All Books (Supports Genre Filtering)
exports.getBooks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre } = req.query;
    const filter = genre ? { genre } : {};
    const books = yield books_1.default.find(filter);
    res.json(books);
}));
// ✅ Get Single Book by ID
exports.getBookById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_1.default.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }
    res.json(book);
}));
// ✅ Add a New Book (Requires Authentication)
exports.addBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const { title, author, description, coverImage, genre, pageCount, publishedYear } = req.body;
    const book = new books_1.default({
        title,
        author,
        description,
        coverImage,
        genre,
        pageCount,
        publishedYear,
        addedBy: req.user.id, // Stores the user who added the book
    });
    const createdBook = yield book.save();
    res.status(201).json(createdBook);
}));
// ✅ Update Book (Requires Authentication)
exports.updateBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const book = yield books_1.default.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.description = req.body.description || book.description;
    book.coverImage = req.body.coverImage || book.coverImage;
    book.genre = req.body.genre || book.genre;
    book.pageCount = req.body.pageCount || book.pageCount;
    book.publishedYear = req.body.publishedYear || book.publishedYear;
    const updatedBook = yield book.save();
    res.json(updatedBook);
}));
// ✅ Delete Book (Admin Only)
exports.deleteBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.isAdmin) {
        res.status(403);
        throw new Error("Access denied. Admins only.");
    }
    const book = yield books_1.default.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }
    yield book.deleteOne();
    res.json({ message: "Book deleted successfully" });
}));
// ✅ Add Rating to a Book
exports.rateBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const book = yield books_1.default.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }
    const rating = Number(req.body.rating);
    if (rating < 1 || rating > 5) {
        res.status(400);
        throw new Error("Rating must be between 1 and 5");
    }
    if (!book.ratings) {
        book.ratings = [];
    }
    book.ratings.push(rating);
    yield book.save();
    res.json({
        message: "Rating added successfully",
        averageRating: book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length
    });
}));
