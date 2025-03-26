import  express  from "express";
import { getUserProfile, updateUserProfile, getAllUsers } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";

import User from "../models/user";  // Make sure the path is correct
import Book from "../models/books";  // Adjust the path if necessary
import Event from "../models/event";  // Adjust the path if necessary

const router = express.Router()

// Protected Routes (Require Authentication)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin Route (Only for Admins)
router.get("/", protect, adminOnly, getAllUsers);


// Admin Dashboard Route
router.get("/admin-dashboard", protect, adminOnly, async (_req, res) => {
    try {
        const [totalUsers, totalBooks, totalEvents] = await Promise.all([
            User.countDocuments(),
            Book.countDocuments(),
            Event.countDocuments()
        ])
        // const totalUsers = await User.countDocuments();
        // const totalBooks = await Book.countDocuments();
        // const totalEvents = await Event.countDocuments();
        
        res.json({ totalUsers, totalBooks, totalEvents });
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin data" });
    }
});

export default router;









// // ✅ Now you can use countDocuments()
// const userCount = await User.countDocuments();
// const bookCount = await Book.countDocuments();
// const eventCount = await Event.countDocuments();

// console.log({ userCount, bookCount, eventCount });

