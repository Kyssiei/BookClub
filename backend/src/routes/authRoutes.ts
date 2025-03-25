import express from "express";
import { registerUser, userLogin, logoutUser} from "../controllers/authController";

const router = express.Router();

//Authentication Routes
router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", logoutUser);

// router.get("/example", getExample);

export default router;
