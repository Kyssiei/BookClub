import  express  from "express";
import { getUserProfile, updateUserProfile, getAllUsers } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router()


// Protected Routes (Require Authentication)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin Route (Only for Admins)
router.get("/", protect, getAllUsers);

export default router;