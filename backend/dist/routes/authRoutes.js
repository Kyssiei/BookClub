"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
//Authentication Routes
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.userLogin);
router.post("/logout", authController_1.logoutUser);
// router.get("/example", getExample);
exports.default = router;
