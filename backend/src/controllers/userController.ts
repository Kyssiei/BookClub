import { Response } from "express";
import User, { IUser } from "../models/user";
import { AuthRequest } from "../middleware/authMiddleware";
import asyncHandler from "express-async-handler"; // Makes sure async errors are caught properly

// Get Logged-in User Profile (Protected)
export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    // Ensure req.user is defined before accessing it
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.json(user);
});

// Update Logged-in User Profile (Protected)
export const updateUserProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    // Makesure req.user is defined
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.bio = req.body.bio || user.bio;

    const updatedUser = await user.save();
    res.json(updatedUser);
});

// Get All Users (Admin Only)
export const getAllUsers = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    // Make sure req.user exists and isAdmin is true
    if (!req.user || !req.user.isAdmin) {
        res.status(403);
        throw new Error("Access denied. Admins only.");
    }

    const users = await User.find().select("-password");
    res.json(users);
});
