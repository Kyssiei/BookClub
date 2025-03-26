"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected Routes (Require Authentication)
router.get("/profile", authMiddleware_1.protect, userController_1.getUserProfile);
router.put("/profile", authMiddleware_1.protect, userController_1.updateUserProfile);
// Admin Route (Only for Admins)
router.get("/", authMiddleware_1.protect, authMiddleware_1.adminOnly, userController_1.getAllUsers);
exports.default = router;
