import { Request, Response } from "express";
import Book from "../models/books";
import { AuthRequest } from "../middleware/authMiddleware";
import asyncHandler from "express-async-handler";

// ✅ Get All Books (Supports Genre Filtering)
export const getBooks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { genre } = req.query;
    const filter = genre ? { genre } : {};

    const books = await Book.find(filter);
    res.json(books);
});

// ✅ Get Single Book by ID
export const getBookById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    res.json(book);
});

// ✅ Add a New Book (Requires Authentication)
export const addBook = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const { title, author, description, coverImage, genre, pageCount, publishedYear } = req.body;

    const book = new Book({
        title,
        author,
        description,
        coverImage,
        genre,
        pageCount,
        publishedYear,
        addedBy: req.user.id, // Stores the user who added the book
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

// ✅ Update Book (Requires Authentication)
export const updateBook = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const book = await Book.findById(req.params.id);

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

    const updatedBook = await book.save();
    res.json(updatedBook);
});

// ✅ Delete Book (Admin Only)
export const deleteBook = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user || !req.user.isAdmin) {
        res.status(403);
        throw new Error("Access denied. Admins only.");
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
});

// ✅ Add Rating to a Book
export const rateBook = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    const rating = Number(req.body.rating);

    if (rating < 1 || rating > 5) {
        res.status(400);
        throw new Error("Rating must be between 1 and 5");
    }

    if(!book.ratings){
        book.ratings = [];
    }

    book.ratings.push(rating);
    await book.save();

    res.json({ 
        message: "Rating added successfully", 
        averageRating: book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length });
});
