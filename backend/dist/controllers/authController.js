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
exports.logoutUser = exports.userLogin = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// register user
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        //check to see if user exists
        const userExists = yield user_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "You already have an account" });
            return;
        }
        //hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        //create new user 
        const newUser = new user_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: "User registered succesfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
// Login User 
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        //generate jwt token 
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ token });
    }
    catch (error) {
        next(error);
        // res.status(500).json({message: "Server error", error});
    }
});
exports.userLogin = userLogin;
//Logout User
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "User logged out successfully" });
});
exports.logoutUser = logoutUser;
