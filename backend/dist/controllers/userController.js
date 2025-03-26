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
exports.getAllUsers = exports.updateUserProfile = exports.getUserProfile = void 0;
const user_1 = __importDefault(require("../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler")); // Makes sure async errors are caught properly
// Get Logged-in User Profile (Protected)
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure req.user is defined before accessing it
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }
    const user = yield user_1.default.findById(req.user.id).select("-password");
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json(user);
}));
// Update Logged-in User Profile (Protected)
exports.updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Makesure req.user is defined
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const user = yield user_1.default.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.bio = req.body.bio || user.bio;
    const updatedUser = yield user.save();
    res.json(updatedUser);
}));
// Get All Users (Admin Only)
exports.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Make sure req.user exists and isAdmin is true
    if (!req.user || !req.user.isAdmin) {
        res.status(403);
        throw new Error("Access denied. Admins only.");
    }
    const users = yield user_1.default.find().select("-password");
    res.json(users);
}));
