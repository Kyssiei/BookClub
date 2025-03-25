import  express  from "express";
import { getUserProfile, updateUserProfile, getAllUsers } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router()


// Protected Routes (Require Authentication)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin Route (Only for Admins)
router.get("/", protect, adminOnly, getAllUsers);

export default router;